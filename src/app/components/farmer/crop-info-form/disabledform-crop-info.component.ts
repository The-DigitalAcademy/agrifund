import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';

import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { CropService } from 'src/app/_services/crop-service/crop.service';
import { Crop } from 'src/app/_models/crop';

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
    cropInfo!: Crop;
    private cropSubscription = new Subscription();
    private portfolioSubscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private _validationsService: ValidationService,
        private _apiService: ApiService,
        private _fb: FormBuilder,
        private route: ActivatedRoute,
        private _cropService: CropService,
        private _portfolioService: PortfolioService
    ) {}

    ngOnInit() {
        this.myForm = this.fb.group({
            seasonFarm: new FormControl('', []),
            cropName: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            cropType: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            cropPrice: new FormControl('', [
                Validators.required,
                this._validationsService.positiveNumberValidator(),
            ]),
        });

        this._portfolioService.setFarmerPortfolio();
        //  this._cropService.setCropData();

        //  this._cropService.getCropData();
        this.cropSubscription = this._portfolioService
            .getFarmerCropInfo()
            .subscribe((crops: Crop[]) => {
                console.table(crops);

                // Assuming 'data' contains fields like first_name, last_name, email, id_number, cell_number
                this.myForm.patchValue({
                    seasonFarm: crops[0].season,
                    cropName: crops[0].name,
                    cropType: crops[0].type,
                    cropPrice: crops[0].price,
                });

                //Update progress for personal info completion
                //this._progressService.setPersonalInfoCompleted(true);

                // Set the 'isDisabled' flag to false to enable form editing
                this.isDisabled = false;
            });
    }

    get createCropControl() {
        return this.myForm.controls;
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
            this.cropInfo = {
                id: this.cropInfo.id,
                season: this.myForm.get('seasonFarm')?.value,
                name: this.myForm.get('cropName')?.value,
                type: this.myForm.get(' cropType')?.value,
                price: this.myForm.get('cropPrice')?.value,
            };
            console.table(this.cropInfo);

            this._apiService.updateFarmerInfo(this.cropInfo).subscribe(data => {
                // Save or update the data here
            });
        }
        // Set crop info completion status to true
        // this.progressService.setCropInfoCompleted(true);

        // Save or update the data here
        this.isDisabled = true;
        this.submitted = false;
        this.myForm.disable();
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
