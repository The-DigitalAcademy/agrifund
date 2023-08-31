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

@Component({
    selector: 'app-disabledform-farm-info',
    templateUrl: './disabledform-farm-info.component.html',
    styleUrls: ['./disabledform-farm-info.component.css'],
})
export class DisabledformFarmInfoComponent {
   
    originalFormValues: any;
    myForm!: FormGroup;
    isDisabled = true;

    farmInfo!: User;
    id: any;
    constructor(
        private _fb: FormBuilder,
        private _validationsService: ValidationService,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getFarmInfo((this.id = this.route.snapshot.params['id']));
        console.log(this.id);
        this.myForm = this._fb.group({
            farmer: new FormControl('', [
                Validators.required,
                this._validationsService.addressContainsStreetValidator,
            ]),
            farm: new FormControl('', [
                Validators.required,
                this._validationsService.addressContainsStreetValidator,
            ]),
            size: new FormControl('', [
                Validators.required,
                this._validationsService.positiveNumberValidator(),
            ]),
            years: new FormControl('', [
                Validators.required,
                this._validationsService.isNumericValidator(),
            ]),
            reasonForFunding: new FormControl('', [Validators.required]),
            num_employee: new FormControl('', [
                Validators.required,
                this._validationsService.isNumericValidator(),
            ]),
        });

        this.getFarmDetails();
    }

    getFarmDetails() {
        this._apiService.getFarmerPortfolio().subscribe(
            (data: any) => {
                console.log('Response Data:', data);
                this.farmInfo = data;
            },
            error => {
                console.error('Error fetching crop details:', error);
            }
        );
    }

    getFarmInfo(id: any) {
        this._apiService.getFarmerById(this.id).subscribe((data: any) => {
            this.farmInfo = data;

            this.myForm = this._fb.group({
                farmer: new FormControl(this.farmInfo.firstName),
                farm_name: new FormControl(this.farmInfo.lastName),
                size: new FormControl(this.farmInfo.email),
                years: new FormControl(this.farmInfo.idNumber),
                num_employee: new FormControl(this.farmInfo.cellNumber),
            });
        });
    }

    get createFarmControl() {
        return this.myForm.controls;
    }

    enableFields() {
        this.isDisabled = false; // Enable the fields by setting isDisabled to false
        this.myForm.enable(); // Enable the formGroup
    }

    saveFields() {
        this.isDisabled = false;
        this.isDisabled = true;
    }

    onSaveClicked(formData: any) {
        if (this.myForm.valid) {
            this.farmInfo = {
                id: this.farmInfo.id,
                password: this.farmInfo.password,
                firstName: this.myForm.get('farmer')?.value,
                lastName: this.myForm.get('farm_name')?.value,
                email: this.myForm.get('size')?.value,
                idNumber: this.myForm.get('years')?.value,
                cellNumber: this.myForm.get('num_employee')?.value,
            };
            console.table(this.farmInfo);

            this._apiService.updateFarmerInfo(this.farmInfo).subscribe(data => {
                // Save or update the data here
            });
        }

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
