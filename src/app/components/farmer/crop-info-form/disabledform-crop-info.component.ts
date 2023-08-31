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
    cropInfo!: User;
    id: any;

    constructor(
        private fb: FormBuilder,
        private _validationsService: ValidationService,
        private _apiService: ApiService,
        private _fb: FormBuilder,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {

         this.getCropInfo((this.id = this.route.snapshot.params['id']));
         console.log(this.id);

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

        // this.originalFormValues = this.farmerData;

        this.getCropDetails();
    }

    getCropDetails() {
        this._apiService.getFarmerPortfolio().subscribe(
            (data: any) => {
                console.log('Response Data:', data);
                this.cropInfo = data;
            },
            error => {
                console.error('Error fetching crop details:', error);
            }
        );
    }

    getCropInfo(id: any) {
        this._apiService.getFarmerById(this.id).subscribe((data: any) => {
            this.cropInfo = data;

            this.myForm = this._fb.group({
                seasonFarm: new FormControl(this.cropInfo.firstName),
                crop_name: new FormControl(this.cropInfo.lastName),
                crop_type: new FormControl(this.cropInfo.email),
            });
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
                   password: this.cropInfo.password,
                   firstName: this.myForm.get('seasonFarm')?.value,
                   lastName: this.myForm.get('crop_name')?.value,
                   email: this.myForm.get(' crop_type')?.value,
                   idNumber: this.myForm.get('date')?.value,
                   cellNumber: this.myForm.get('cell_number')?.value,
               };
               console.table(this.cropInfo);

               this._apiService
                   .updateFarmerInfo(this.cropInfo)
                   .subscribe(data => {
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
