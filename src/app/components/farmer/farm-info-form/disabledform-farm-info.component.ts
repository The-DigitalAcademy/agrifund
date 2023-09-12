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
    //     id: any;
    constructor(
        private _fb: FormBuilder,
        private _validationsService: ValidationService,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private route: ActivatedRoute,
        private _farmService: FarmService
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
    }

        this._portfolioService.setFarmerFarm();

        
            this.farmSubscription = this._portfolioService
                .getFarmerFarm()
                .subscribe((farms: FarmerFarm[]) => {
                    console.table(farms);

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

                //Update progress for personal info completion
                //this._progressService.setPersonalInfoCompleted(true);

                // Set the 'isDisabled' flag to false to enable form editing
                this.isDisabled = true;
            });
    }

    get createFarmControl() {
        return this.myForm.controls;
    }

    enableFields() {
        this.isDisabled = false; // Enable the fields by setting isDisabled to false
        this.myForm.enable(); // Enable the formGroup
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
            console.table(this.farmInfo);

            this._farmService.editFarm(this.farmInfo);
        }
        // Set crop info completion status to true
        // this.progressService.setCropInfoCompleted(true);

        // Save or update the data here
        this.isDisabled = true;

        this.myForm.disable();
        // this.progressService.setFarmInfoCompleted(true);
    }

    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }
}

