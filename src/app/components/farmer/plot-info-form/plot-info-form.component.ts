import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    plotInfo!: User;
    id: any;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationService,
        private _apiService: ApiService,
        private _fb: FormBuilder,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getPlotInfo((this.id = this.route.snapshot.params['id']));
        console.log(this.id);

        this.myForm = this.fb.group({
            farmAddress: new FormControl('', [
                Validators.required,
                this.validationsService.addressContainsStreetValidator,
            ]),
            size: new FormControl('', [
                Validators.required,
                this.validationsService.positiveNumberValidator(),
            ]),

            date: new FormControl('', [Validators.required]),
        });

        //this.originalFormValues = farmerData;
        this.getPlotDetails();
    }

    getPlotDetails() {
        this._apiService.getFarmerPortfolio().subscribe(
            (data: any) => {
                console.log('Response Data:', data);
                this.plotInfo = data;
            },
            error => {
                console.error('Error fetching plot details:', error);
            }
        );
    }

    getPlotInfo(id: any) {
        this._apiService.getFarmerById(this.id).subscribe((data: any) => {
            this.plotInfo = data;

            this.myForm = this._fb.group({
                farmAddress: new FormControl(this.plotInfo.firstName),
                size: new FormControl(this.plotInfo.lastName),

                date: new FormControl(this.plotInfo.idNumber),
            });
        });
    }

    get createPlotControl() {
        return this.myForm.controls;
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
        if (this.myForm.valid) {
            this.plotInfo = {
                id: this.plotInfo.id,
                password: this.plotInfo.password,
                firstName: this.myForm.get('farmer')?.value,
                lastName: this.myForm.get('size')?.value,
                email: this.myForm.get('farm')?.value,
                idNumber: this.myForm.get('date')?.value,
                cellNumber: this.myForm.get('cell_number')?.value,
            };
            console.table(this.plotInfo);

            this._apiService.updateFarmerInfo(this.plotInfo).subscribe(data => {
                // Save or update the data here
            });
        }

        this.isDisabled = true;
        this.myForm.disable();
    }
}
