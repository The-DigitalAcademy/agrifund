/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { ProgressServiceService } from 'src/app/_services/progress-service/progress-service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';

import { ApiService } from 'src/app/_services/api-service/api.service';
import { User } from 'src/app/_models/User';

@Component({
    selector: 'app-feature-disabledform-personal-info',
    templateUrl: './personal-info-form.component.html',
    styleUrls: ['./personal-info-form.component.css'],
})
export class DisabledformPersonalInfoComponent implements OnInit {
    myForm!: FormGroup;

    editedData: any;
    farmerData: any;
    isDisabled = true;
    originalFormValues: any;
    submitted = false;

    // stores the farmers personal information
    personalInfo: User[] =[];
    // stores the user id
    userId=2;

    constructor(
        private fb: FormBuilder,
        private validationService: ValidationService,
        private progressService: ProgressServiceService,
        private _apiService: ApiService,
        
    ) {}

    ngOnInit() {
        this._apiService.getFarmerUser(this.userId).subscribe((farmer: any) => {
            this.personalInfo = farmer;
            this.myForm.get('first_name')?.setValue(farmer.first_name);
            this.myForm.get('last_name')?.setValue(farmer.last_name);
            this.myForm.get('email')?.setValue(farmer.email);
            this.myForm.get('id_number')?.setValue(farmer.idNumber);
            this.myForm.get('cell_number')?.setValue(farmer.cell_phone);
            console.table(farmer);
        });

        this.myForm = this.fb.group({
            first_name: new FormControl('', [
                // Notice the initial empty string value
                Validators.required,
                this.validationService.textWithoutNumbersValidator(),
            ]),
            last_name: new FormControl('', [
                // Initial empty string value
                Validators.required,
                this.validationService.textWithoutNumbersValidator(),
            ]),
            email: new FormControl('', [
                // Initial empty string value
                Validators.required,
                this.validationService.emailValidator(),
            ]),
            id_number: new FormControl('', [
                // Initial empty string value
                Validators.required,
                this.validationService.idNumberValidator(),
            ]),
            cell_number: new FormControl('', [
                // Initial empty string value
                Validators.required,
                this.validationService.phoneNumberValidator(),
            ]),
        });
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
        this.progressService.setPersonalInfoCompleted(true);
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
