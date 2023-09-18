/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { Subscription } from 'rxjs';
import { FarmerFarm } from 'src/app/_models/farmerFarm';
import { FarmService } from 'src/app/_services/farm-service/farm.service';
import { ProgressServiceService } from 'src/app/_services/progress-service/progress-service.service';

@Component({
    selector: 'app-disabledform-farm-info',
    templateUrl: './disabledform-farm-info.component.html',
    styleUrls: ['./disabledform-farm-info.component.css'],
})
export class DisabledformFarmInfoComponent {
    originalFormValues: any;
    myForm!: FormGroup;
    isDisabled = true;
    private farmSubscription = new Subscription();
    farmInfo!: FarmerFarm;
    submitted = false;
    private initialProgress = 0; // Initialize the initial progress
    //     id: any;
    constructor(
        private _fb: FormBuilder,
        private _validationsService: ValidationService,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private route: ActivatedRoute,
        private _farmService: FarmService,
        private _progressService: ProgressServiceService
    ) {}

    ngOnInit() {
        // this.getPlotInfo((this.FarmId= this.route.snapshot.params['id']));
        // console.log(this.FarmId);

        this.myForm = this._fb.group({
            farmerAddress: new FormControl('', [
                Validators.required,
                this._validationsService.addressLengthValidator,
            ]),
            farm_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            farmAddress: new FormControl('', [
                Validators.required,
                this._validationsService.addressLengthValidator,
            ]),

            years: new FormControl('', [
                Validators.required,
                this._validationsService.isNumericValidator(),
            ]),
            reasonForFunding: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),

            num_employee: new FormControl('', [
                Validators.required,
                this._validationsService.isNumericValidator(),
            ]),
        });

        this.farmInfo = {
            id: 0,
            numberOfEmployees: 0,
            farmName: '',
            farmAddress: '',
            yearsActive: 0,
            address: '', //stores residential address
            farmingReason: '', //stores the reason for needing funding
            crops: [],
            plots: [],
            assets: [],
            incomeStatements: [],
        };

        this._portfolioService.setFarmerFarm();

        this.farmSubscription = this._portfolioService
            .getFarmerFarm()
            .subscribe((farms: FarmerFarm[]) => {
                // console.table(farms);

                // Assuming 'data' contains fields like first_name, last_name, email, id_number, cell_number
                if (farms.length > 0) {
                    this.farmInfo = farms[0]; // Assuming there's only one farm per farmer
                    this.myForm.patchValue({
                        farm_name: this.farmInfo.farmName,
                        farmAddress: this.farmInfo.farmAddress,
                        years: this.farmInfo.yearsActive,
                        farmerAddress: this.farmInfo.address,
                        num_employee: this.farmInfo.numberOfEmployees,
                        reasonForFunding: this.farmInfo.farmingReason,
                    });
                }
                // Notify the progress service that the plot info form is completed
                this._progressService.updateFarmInfoCompleted(true);

                // Set the 'isDisabled' flag to false to enable form editing
                this.isDisabled = true;
                // Calculate the initial progress when the component is initialized
                this.initialProgress = this.calculateProgress();
            });

        this.myForm.valueChanges.subscribe(() => {
            const progress = this.calculateProgress();
            this._progressService.setFarmInfoCompleted(progress);
        });
    }

    calculateProgress(): number {
        // Calculate and return the progress based on form completion
        const totalFields = Object.keys(this.myForm.controls).length;
        const completedFields = Object.keys(this.myForm.controls).filter(
            controlName => this.myForm.controls[controlName].valid
        ).length;
        return (completedFields / totalFields) * 20;
    }

    get createFarmControl() {
        return this.myForm.controls;
    }

    enableFields() {
        this.isDisabled = false; // Enable the fields by setting isDisabled to false
        this.myForm.enable(); // Enable the formGroup
        // Update the progress when "Edit" is clicked based on the initial progress
        const progress = this.calculateProgress() - this.initialProgress;
        this._progressService.setFarmInfoCompleted(progress);
    }

    onSaveClicked() {
        this.submitted = true; // Indicate that the form has been submitted

        if (this.myForm.valid) {
            this.farmInfo = {
                id: this.farmInfo.id,
                crops: this.farmInfo.crops,
                plots: this.farmInfo.plots,
                assets: this.farmInfo.assets,
                farmName: this.farmInfo.farmName,
                incomeStatements: this.farmInfo.incomeStatements,
                farmAddress: this.myForm.get('farmAddress')?.value,
                yearsActive: this.myForm.get('years')?.value,
                address: this.myForm.get('farmerAddress')?.value,
                numberOfEmployees: this.myForm.get('num_employee')?.value,
                farmingReason: this.myForm.get('reasonForFunding')?.value,
            };
            // Notify the progress service that the plot info form is completed
            this._progressService.updateFarmInfoCompleted(true);
            // console.table(this.farmInfo);
            setTimeout(() => {
                console.log('Form saved:', this.myForm.value);
                // Assuming the save was successful, increase the progress
                const progress = this.calculateProgress() + 20;
                this._progressService.setFarmInfoCompleted(progress);
            }, 1000);

            this._farmService.editFarm(this.farmInfo);
        }

        this.isDisabled = true;

        this.myForm.disable();
    }

    onCancelClicked() {
        // Reset the form values to the original values (cropInfo)
        this.myForm.patchValue({
            farmName: this.farmInfo.farmName,
            farmAddress: this.farmInfo.farmAddress,
            years: this.farmInfo.yearsActive,
            farmerAddress: this.farmInfo.address,
            num_employee: this.farmInfo.numberOfEmployees,
            reasonForFunding: this.farmInfo.farmingReason,
        });

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }
}
