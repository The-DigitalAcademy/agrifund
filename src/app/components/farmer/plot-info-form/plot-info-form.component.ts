import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';

@Component({
    selector: 'app-plot-info-form',
    templateUrl: './plot-info-form.component.html',
    styleUrls: ['./plot-info-form.component.css'],
})
export class PlotInfoFormComponent implements OnInit {
    originalFormValues: any;
    myForm!: FormGroup;
    isDisabled = true;
    editedData: any;
    farmerData: any;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService
    ) {}

    ngOnInit() {
        // Placeholder data for the farmer's information
        const farmerData = {
            farmer: 'Mankweng-A Turfloop NO:3434',
            size: '9',
            date: '2023-07-13', // Format the date as 'yyyy-MM-dd'
        };

        this.myForm = this.fb.group({
            farmer: new FormControl(farmerData.farmer, [
                Validators.required,
                this.validationsService.addressContainsStreetValidator,
            ]),
            size: new FormControl(farmerData.size, [
                Validators.required,
                this.validationsService.positiveNumberValidator(),
            ]),
            date: new FormControl(farmerData.date, [Validators.required]),
        });

        this.originalFormValues = farmerData;
    }

    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
    }

    onCancelClicked() {
        this.myForm.patchValue(this.originalFormValues);
        this.isDisabled = true;
        this.myForm.disable();
    }

    onSaveClicked(formData: any) {
        this.farmerData = formData;
        this.isDisabled = true;
        this.myForm.disable();
    }
}
