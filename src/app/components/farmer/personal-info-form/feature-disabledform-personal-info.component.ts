/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';

@Component({
    selector: 'app-feature-disabledform-personal-info',
    templateUrl: './feature-disabledform-personal-info.component.html',
    styleUrls: ['./feature-disabledform-personal-info.component.css'],
})
export class DisabledformPersonalInfoComponent implements OnInit {
    myForm!: FormGroup;

    editedData: any;
    farmerData: any;
    isDisabled = true;
    originalFormValues: any;
    submitted = false;

    // stores a farmer's id
    farmerId = 1;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService
    ) {}

    ngOnInit() {
        // Assuming you have a method in your ApiService to get registered user details
        this._apiService.getFarmerUser(this.farmerId).subscribe(
            (user: User) => {
                // Populate the form with user details
                this.myForm.patchValue({
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email,
                    id_number: user.idNumber,
                    cell_number: user.cellNumber,
                });
                // Disable the form fields
                this.myForm.disable();
            },
            error => {
                console.error('Error fetching user details:', error);
            }
        );

        this.myForm = this.fb.group({
            first_name: new FormControl('', [
                // Notice the initial empty string value
                Validators.required,
                this.validationsService.textWithoutNumbersValidator(),
            ]),
            last_name: new FormControl('', [
                // Initial empty string value
                Validators.required,
                this.validationsService.textWithoutNumbersValidator(),
            ]),
            email: new FormControl('', [
                // Initial empty string value
                Validators.required,
                this.validationsService.emailValidator(),
            ]),
            id_number: new FormControl('', [
                // Initial empty string value
                Validators.required,
                this.validationsService.idNumberValidator(),
            ]),
            cell_number: new FormControl('', [
                // Initial empty string value
                Validators.required,
                this.validationsService.phoneNumberValidator(),
            ]),
            // ... other fields
        });

        // Save the initial form values
        // this.originalFormValues = userData;
    }

    enableFields() {
        this.isDisabled = false; // Enable the fields by setting isDisabled to false
        this.myForm.enable(); // Enable the formGroup
    }
    saveFields() {
        this.editedData = this.myForm.value;
        this.isDisabled = true;
    }

    onSaveClicked(formData: any) {
        this.farmerData = formData;
        this.isDisabled = true;
        this.myForm.disable();
        // Set personal info completion status to true
        // this.progressService.setPersonalInfoCompleted(true);
    }

    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }

    //validations
}
