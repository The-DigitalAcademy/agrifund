import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';

@Component({
    selector: 'app-disabledform-crop-info',
    templateUrl: './disabledform-crop-info.component.html',
    styleUrls: ['./disabledform-crop-info.component.css'],
})
export class DisabledformCropInfoComponent implements OnInit {
    // Input to receive crop info progress

    farmerData: any;
    myForm!: FormGroup;
    isDisabled = true;
    editedData: any = null;
    originalFormValues: any;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private _validationsService: ValidationService
    ) {}

    ngOnInit() {
        this.myForm = this.fb.group({
            seasonFarm: new FormControl('', []),
            crop_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),

            crop_type: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            // ... other fields
        });

        // this.myForm = this.fb.group({
        //     seasonFarm: new FormControl({

        //         disabled: true,
        //     }),
        //     crop_name: new FormControl(
        //         { value: this.farmerData.crop_name, disabled: true },
        //         [
        //             Validators.required,
        //             this._validationsService.textWithoutNumbersValidator(),
        //         ]
        //     ),
        //     seedsAmount: new FormControl(
        //         { value: this.farmerData.seedsAmount, disabled: true },
        //         [
        //             Validators.required,
        //             this._validationsService.isNumericValidator(),
        //         ]
        //     ),
        //     cropsInfo: new FormControl({
        //         value: this.farmerData.selectedCrops,
        //         disabled: true,
        //     }), // Include the cropsInfo field
        // });

        // // Save the initial form values
        // this.originalFormValues = this.farmerData;
    }

    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
    }

    saveFields() {
        this.editedData = this.myForm.value;
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
        // Set crop info completion status to true
        // this.progressService.setCropInfoCompleted(true);
    }

    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
        this.submitted = false;
    }
}
