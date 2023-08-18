/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { ProgressService } from 'src/app/services/portfolio/progress.service';

@Component({
    selector: 'app-disabledform-crop-info',
    templateUrl: './crop-info-form.component.html',
    styleUrls: ['./crop-info-form.component.css'],
})
export class DisabledformCropInfoComponent implements OnInit {
    farmerData: any;
    myForm!: FormGroup;
    isDisabled = true;
    editedData: any = null;
    originalFormValues: any;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private progressService: ProgressService
    ) {}

    ngOnInit() {
        // Placeholder data for the farmer's information
        this.farmerData = {
            seasonFarm: 'Spring',
            crop_name: 'Potatoes',
            seedsAmount: '70',
        };

        // Create the form with initial values and validators
        this.myForm = this.fb.group({
            seasonFarm: new FormControl({
                value: this.farmerData.seasonFarm,
                disabled: true,
            }),
            crop_name: new FormControl(
                { value: this.farmerData.crop_name, disabled: true },
                [
                    Validators.required,
                    this.validationsService.textWithoutNumbersValidator(),
                ]
            ),
            seedsAmount: new FormControl(
                { value: this.farmerData.seedsAmount, disabled: true },
                [
                    Validators.required,
                    this.validationsService.isNumericValidator(),
                ]
            ),
            cropsInfo: new FormControl({
                value: this.farmerData.selectedCrops,
                disabled: true,
            }), // Include the cropsInfo field
        });

        // Save the initial form values for resetting later
        this.originalFormValues = this.farmerData;
    }

    // Enable form fields for editing
    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
    }

    // Save edited data
    saveFields() {
        this.editedData = this.myForm.value;
        this.isDisabled = true;
    }

    // When the "Save" button is clicked
    onSaveClicked(formData: any) {
        this.farmerData = formData;
        this.isDisabled = true;
        this.myForm.disable();
        // Set crop info completion status to true
        this.progressService.setCropInfoCompleted(true);
    }

    // When the "Cancel" button is clicked
    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }
}
