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
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { ProgressService } from 'src/app/services/portfolio/progress.service';

@Component({
    selector: 'app-disabledform-farm-info',
    templateUrl: './farm-info-form.component.html',
    styleUrls: ['./farm-info-form.component.css'],
})
export class DisabledformFarmInfoComponent {
    
    originalFormValues: any;
    myForm!: FormGroup;
    isDisabled = true;
    editedData: any;
    farmerData: any;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private progressService: ProgressService
    ) {}

    ngOnInit() {
        // Placeholder data for the farmer's information
        const farmerData = {
            farmer: 'Mankweng-A Turfloop NO:3434 ',
            farm_name: 'John Doe Farm',
            farm: 'Mankweng-A Turfloop NO:3434 ',

            years: '10',
            num_employee: '2',
            reasonForFunding:
                'I want to improve my land of farming and equipments',
        };

        this.myForm = this.fb.group({
            farmer: new FormControl(
                { value: farmerData.farmer, disabled: true }, // Initialize with provided value and disable the field
                [
                    Validators.required,
                    this.validationsService.addressContainsStreetValidator,
                ]
            ),
            farm: new FormControl(
                { value: farmerData.farm, disabled: true }, // Initialize with provided value and disable the field
                [
                    Validators.required,
                    this.validationsService.addressContainsStreetValidator,
                ]
            ),
            farm_name: new FormControl(
                { value: farmerData.farm_name, disabled: true },
                [
                    // Notice the initial empty string value
                    Validators.required,
                    this.validationsService.textWithoutNumbersValidator(),
                ]
            ),
            years: new FormControl(
                { value: farmerData.years, disabled: true }, // Initialize with provided value and disable the field
                [
                    Validators.required,
                    this.validationsService.isNumericValidator(),
                ]
            ),
            num_employee: new FormControl(
                { value: farmerData.num_employee, disabled: true }, // Initialize with provided value and disable the field
                [
                    Validators.required,
                    this.validationsService.isNumericValidator(),
                ]
            ),
            reasonForFunding: new FormControl(
                { value: farmerData.reasonForFunding, disabled: true }, // Initialize with provided value and disable the field
                [Validators.required]
            ),
        });

        this.originalFormValues = farmerData;
    }

    // Enable form fields for editing
    enableFields() {
        this.isDisabled = false; // Enable the fields by setting isDisabled to false
        this.myForm.enable(); // Enable the formGroup
    }

    

    // Handle "Save" button click
    onSaveClicked(formData: any) {
        this.farmerData = formData; // Update farmerData with the form data
        this.isDisabled = true; // Disable the fields
        this.myForm.disable(); // Disable the formGroup
        this.progressService.setFarmInfoCompleted(true); // Update progress status
    }

    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }
}
