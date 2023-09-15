// disabledform-crop-info.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { CropService } from 'src/app/_services/crop-service/crop.service';
import { FarmerCrop } from 'src/app/_models/farmerCrop';
import { ProgressServiceService } from 'src/app/_services/progress-service/progress-service.service';

@Component({
    selector: 'app-disabledform-crop-info',
    templateUrl: './disabledform-crop-info.component.html',
    styleUrls: ['./disabledform-crop-info.component.css'],
})
export class DisabledformCropInfoComponent implements OnInit {
    // Input to receive crop info progress
    id: any;
    farmerData: any;
    myForm!: FormGroup;
    isDisabled = true;
    editedData: any = null;
    originalFormValues: any;
    submitted = false;
    cropInfo!: FarmerCrop;
    private cropSubscription = new Subscription();
    private portfolioSubscription = new Subscription();
    farmId = 0;

    constructor(
        private fb: FormBuilder,
        private _validationsService: ValidationService,
        private _apiService: ApiService,
        private route: ActivatedRoute,
        private _cropService: CropService,
        private _portfolioService: PortfolioService,
        private _progressService: ProgressServiceService
    ) {}

    ngOnInit() {
        this.myForm = this.fb.group({
            season: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            cropSeedPrice: new FormControl('', [Validators.required]),
        });

        // Initialize cropInfo as an empty object
        this.cropInfo = {
            id: 0,
            season: '',
            name: '',
            type: '',
            price: 0,
            farmId: 0,
        };

        this._portfolioService.setFarmerFarm();
        // Fetch crop data and populate the form
        this.cropSubscription = this._portfolioService
            .getFarmerCropInfo()
            .subscribe((crops: FarmerCrop[]) => {
                if (crops.length > 0) {
                    this.cropInfo = crops[0];
                    // Populate the form fields
                    this.myForm.patchValue({
                        season: this.cropInfo.season,
                        name: this.cropInfo.name,
                        type: this.cropInfo.type,
                        cropSeedPrice: this.cropInfo.price,
                    });
                }

                //Update progress for personal info completion
                // this._progressService.setPersonalInfoCompleted(true);

                // Set the 'isDisabled' flag to true initially
                this.isDisabled = true;
            });

        this.myForm.valueChanges.subscribe(() => {
            const progress1 = this.calculateProgress();
            this._progressService.setCropInfoCompleted(progress1);
        });
    }

    calculateProgress(): number {
        // Calculate and return the progress based on form completion
        const totalFields = Object.keys(this.myForm.controls).length;
        const completedFields = Object.keys(this.myForm.controls).filter(
            controlName => this.myForm.controls[controlName].valid
        ).length;
        return (completedFields / totalFields) * 20;
    }

    get createCropControl() {
        return this.myForm.controls;
    }

    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
    }

    onSaveClicked() {
        this.submitted = true; // Indicate that the form has been submitted
        if (this.myForm.valid) {
            // Update cropInfo with form values
            this.cropInfo = {
                farmId: this.farmId,
                id: this.cropInfo.id,
                season: this.myForm.get('season')?.value,
                name: this.myForm.get('name')?.value,
                type: this.myForm.get('type')?.value,
                price: this.myForm.get('cropSeedPrice')?.value,
            };

            console.table(this.cropInfo);

            // Update the crop data using the service
            this._cropService.updateCropData(this.cropInfo);
        }

        

        // Disable the form fields
        this.isDisabled = true;
        this.myForm.disable();
    }

    onCancelClicked() {
        // Reset the form values to the original values (cropInfo)
        this.myForm.patchValue({
            season: this.cropInfo.season,
            name: this.cropInfo.name,
            type: this.cropInfo.type,
            cropSeedPrice: this.cropInfo.price,
        });

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }
}
