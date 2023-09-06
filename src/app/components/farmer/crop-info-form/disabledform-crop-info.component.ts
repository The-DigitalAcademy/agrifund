import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { Crop } from 'src/app/_models/Crop';
import { ApiService } from 'src/app/_services/api-service/api.service';

import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { CropService } from 'src/app/_services/crop-service/crop.service';
import { ProgressServiceService } from 'src/app/_services/progress-service/progress-service.service';

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
        private _portfolioService: PortfolioService,
        private _progressService: ProgressServiceService
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
        });

        this._portfolioService.setFarmerPortfolio();
        //  this._cropService.setCropData();

        //  this._cropService.getCropData();
        this.cropSubscription = this._portfolioService
            .getFarmerCropInfo()
            .subscribe((crops: Crop[]) => {
                // console.table(crops);

                // Assuming 'data' contains fields like first_name, last_name, email, id_number, cell_number
                this.myForm.patchValue({
                    seasonFarm: crops[0].season,
                    crop_name: crops[0].name,
                    crop_type: crops[0].type,
                });

                //Update progress for personal info completion
                this._progressService.setPersonalInfoCompleted(true);

                // Set the 'isDisabled' flag to false to enable form editing
                this.isDisabled = true;
            });
    }

    // this._apiService.addRecord(this.record).subscribe(data => {
    //     // adds the new record to the observable array after successfully adding the record
    //     this._bookkeepingService.addRecord(this.record);
    // });

    // getCropDetails() {
    //     if (!this.cropInfo) {
    //         this._mockService.getCropInfo().subscribe((data: any) => {
    //             this.cropInfo = data;

    //             console.table(data);

    //             // Populate the form fields
    //             this.myForm.patchValue({
    //                 seasonFarm: this.cropInfo.season,
    //                 crop_name: this.cropInfo.name,
    //                 crop_type: this.cropInfo.type,
    //             });
    //         });
    //     }
    // }

    get createCropControl() {
        return this.myForm.controls;
    }

    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
    }

    onSaveClicked(formData: any) {
        // this.submitted = true; // Indicate that the form has been submitted
        // if (this.myForm.valid) {
        //     this.cropInfo = {
        //         id: this.cropInfo.id,
        //         season: this.myForm.get('seasonFarm')?.value,
        //         name: this.myForm.get('crop_name')?.value,
        //         type: this.myForm.get(' crop_type')?.value,
        //     };
        //     console.table(this.cropInfo);

        //     this._apiService.updateFarmerInfo(this.cropInfo).subscribe(data => {
        //         // Save or update the data here
        //     });
        // }
        // Set crop info completion status to true
        // this.progressService.setCropInfoCompleted(true);

        // Save or update the data here
        this.isDisabled = true;

        this.myForm.disable();
    }

    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }
}
