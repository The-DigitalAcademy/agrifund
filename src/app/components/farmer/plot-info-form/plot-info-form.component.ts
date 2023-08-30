import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';
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
        private validationsService: ValidationService
    ) {}

    ngOnInit() {
        // Placeholder data for the farmer's information
        const farmerData = {
            farmer: 'Mankweng-A Turfloop NO:3434 ',
            size: '9',
            farm: 'Farm Address Placeholder',
            date: '2023-07-13',
        };

        this.myForm = this.fb.group({
            farmer: new FormControl(
                { value: farmerData.farmer, disabled: true },
                [
                    Validators.required,
                    this.validationsService.addressContainsStreetValidator,
                ]
            ),
            size: new FormControl({ value: farmerData.size, disabled: true }, [
                Validators.required,
                this.validationsService.positiveNumberValidator(),
            ]),
            farm: new FormControl({ value: farmerData.farm, disabled: true }, [
                Validators.required,
                this.validationsService.addressContainsStreetValidator,
            ]),
            date: new FormControl({ value: farmerData.date, disabled: true }, [
                Validators.required,
            ]),
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
