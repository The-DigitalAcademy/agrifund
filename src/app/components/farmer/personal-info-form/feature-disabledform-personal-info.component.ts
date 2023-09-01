import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { ProgressServiceService } from 'src/app/_services/progress-service/progress-service.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { FarmerPortfolio } from 'src/app/_models/FarmerPortfolio';

@Component({
    selector: 'app-feature-disabledform-personal-info',
    templateUrl: './feature-disabledform-personal-info.component.html',
    styleUrls: ['./feature-disabledform-personal-info.component.css'],
})
export class DisabledformPersonalInfoComponent implements OnInit {
    myForm!: FormGroup;
    originalFormValues: any;
    isDisabled = true;

    personalInfo!: FarmerPortfolio;
    id: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _fb: FormBuilder,
        private _validationsService: ValidationService,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private _progressService: ProgressServiceService
    ) {}

    ngOnInit() {
        this.getPersonalData((this.id = this.route.snapshot.params['id']));
        console.log(this.id);

        this.myForm = this._fb.group({
            first_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            last_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            email: new FormControl('', [
                Validators.required,
                this._validationsService.emailValidator(),
            ]),
            id_number: new FormControl('', [
                Validators.required,
                this._validationsService.idNumberValidator(),
            ]),
            cell_number: new FormControl('', [
                Validators.required,
                this._validationsService.phoneNumberValidator(),
            ]),
        });

        this.getPersonalDetails();
    }

    getPersonalDetails() {
        this._apiService.getFarmerPortfolio().subscribe(
            (data: any) => {
                console.log('Response Data:', data);
                this.personalInfo = data;

                //Populate form controls with retrieved data
                // this.myForm.patchValue({
                //     first_name: this.personalInfo.firstName,
                //     last_name: this.personalInfo.lastName,
                //     email: this.personalInfo.email,
                //     id_number: this.personalInfo.idNumber,
                //     cell_number: this.personalInfo.cellNumber,
                // });

                // Update progress for personal info completion
                this._progressService.setPersonalInfoCompleted(true);
            },
            error => {
                console.error('Error fetching personal details:', error);
            }
        );
    }

    getPersonalData(id: any) {
        this._apiService.getFarmerById(this.id).subscribe((data: any) => {
            this.personalInfo = data;

            this.myForm = this._fb.group({
                first_name: new FormControl(this.personalInfo.firstName),
                last_name: new FormControl(this.personalInfo.lastName),
                email: new FormControl(this.personalInfo.email),
                cell_number: new FormControl(this.personalInfo.cellNumber),
            });
        });
    }

    get createPersonalControl() {
        return this.myForm.controls;
    }

    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
    }

    onSaveClicked(formData: any) {
        if (this.myForm.valid) {
            this.personalInfo = {
                id: this.personalInfo.id,
                firstName: this.myForm.get('first_name')?.value,
                lastName: this.myForm.get('last_name')?.value,
                email: this.myForm.get('email')?.value,
                cellNumber: this.myForm.get('cell_number')?.value,
                farms: this.myForm.get('farms')?.value
            };
            console.table(this.personalInfo);

            this._apiService
                .updateFarmerInfo(this.personalInfo)
                .subscribe(data => {
                    // Save or update the data here
                });
        }
        this.isDisabled = true;
        this._progressService.setPersonalInfoCompleted(true);
        this.myForm.disable();
    }
    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;

        this.myForm.disable();
    }

    // Validations
}
