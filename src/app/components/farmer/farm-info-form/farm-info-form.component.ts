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

import { ValidationService } from 'src/app/_services/validation-service/validation.service';

@Component({
    selector: 'app-disabledform-farm-info',
    templateUrl: './farm-info-form.component.html',
    styleUrls: ['./farm-info-form.component.css'],
})
export class DisabledformFarmInfoComponent {
    onFileSelected($event: Event) {
        throw new Error('Method not implemented.');
    }
    originalFormValues: any;
    myForm!: FormGroup;
    isDisabled = true;
    editedData: any;
    farmerData: any;

    constructor(
        private fb: FormBuilder,
        private validationService: ValidationService
    ) {}

    ngOnInit() {
        const farmerData = {
            farmer: 'Mankweng-A Turfloop NO:3434 ',
            farm: 'Mankweng-A Turfloop NO:3434 ', // Update with default values
            size: '9', // Update with default values
            years: '10', // Update with default values
            num_employee: '2', // Update with default values
            reasonForFunding:
                'I want to improve my land of farming and equipments', // Update with default values
        };

        this.myForm = this.fb.group({
            farmer: new FormControl(
                { value: farmerData.farmer, disabled: true },
                [
                    Validators.required,
                    this.validationService.addressContainsStreetValidator,
                ]
            ),
            farm: new FormControl({ value: farmerData.farm, disabled: true }, [
                Validators.required,
                this.validationService.addressContainsStreetValidator,
            ]),
            size: new FormControl({ value: farmerData.size, disabled: true }, [
                Validators.required,
                this.validationService.positiveNumberValidator(),
            ]),
            years: new FormControl(
                { value: farmerData.years, disabled: true },
                [
                    Validators.required,
                    this.validationService.isNumericValidator(),
                ]
            ),
            num_employee: new FormControl(
                { value: farmerData.num_employee, disabled: true },
                [
                    Validators.required,
                    this.validationService.isNumericValidator(),
                ]
            ),
            reasonForFunding: new FormControl(
                { value: farmerData.reasonForFunding, disabled: true },
                [Validators.required]
            ),
        });

        this.originalFormValues = farmerData;
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
