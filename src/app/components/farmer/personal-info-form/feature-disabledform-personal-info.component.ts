import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';

@Component({
    selector: 'app-feature-disabledform-personal-info',
    templateUrl: './feature-disabledform-personal-info.component.html',
    styleUrls: ['./feature-disabledform-personal-info.component.css'],
})
export class DisabledformPersonalInfoComponent implements OnInit {
    myForm!: FormGroup;
    originalFormValues: any;
    isDisabled = true;
    submitted = false;
    personalInfo!: User;

    constructor(
        private fb: FormBuilder,
        private _validationsService: ValidationService,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService
    ) {}

    ngOnInit() {
        this.myForm = this.fb.group({
            first_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            last_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            email: new FormControl('', [
                Validators.required,
                this._validationsService.emailValidator(),
            ]),
            id_number: new FormControl('', [
                Validators.required,
                this._validationsService.idNumberValidator(),
            ]),
            cell_number: new FormControl('', [
                Validators.required,
                this._validationsService.phoneNumberValidator(),
            ]),
            // ... other fields
        });

        // Fetch and populate user data
        // this._apiService.getFarmerByEmail().subscribe((farmer: any) => {
        //     this.personalInfo = farmer;
        //     this.myForm.get('first_name')?.setValue(farmer.firstName);
        //     this.myForm.get('last_name')?.setValue(farmer.lastName);
        //     this.myForm.get('email')?.setValue(farmer.email);
        //     this.myForm.get('id_number')?.setValue(farmer.idNumber);
        //     this.myForm.get('cell_number')?.setValue(farmer.cellNumber);
        //     console.table(farmer);
        // });

        // Disable the form initially
        // this.myForm.disable();
        this.getPersonalDetails();
    }
    getPersonalDetails() {
        this._apiService.getFarmerPortfolio().subscribe(
            (data: any) => {
                console.log('API Response Data:', data);
                this.personalInfo = data;

                this.myForm.patchValue({
                    first_name: this.personalInfo.firstName,
                    last_name: this.personalInfo.lastName,
                    email: this.personalInfo.email,
                    id_number: this.personalInfo.idNumber,
                    cell_number: this.personalInfo.cellNumber,
                });
                console.log('Form Data:', this.myForm.value);
            },
            (error: any) => {
                console.error('Error fetching user data:', error);
            }
        );
    }

    get createInfoControl() {
        return this.myForm.controls;
    }

    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
    }

    saveFields() {
        this.originalFormValues = this.myForm.value; // Save the current values as original
        this.isDisabled = true;
    }

    onSaveClicked(formData: any) {
        this.submitted = true; // Indicate that the form has been submitted
        if (this.myForm.valid) {
            // Save or update the data here
            this.isDisabled = true;
            this.submitted = false;
            this.myForm.disable();
        }
    }
    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;
        this.submitted = false;
        this.myForm.disable();
    }

    // Validations
}