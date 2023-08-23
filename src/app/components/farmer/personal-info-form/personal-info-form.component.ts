/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { ProgressService } from 'src/app/services/portfolio/progress.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api/api.service';

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
    personalInfo!: Users;
    // stores the user id
    userId=2;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private progressService: ProgressService,
        private _apiService: ApiService
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
