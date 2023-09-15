import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
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
    // subscription for portfolio service
    private portfolioSubscription = new Subscription();
    personalInfo!: FarmerPortfolio;
    id: any;
    submitted = false;

    private initialProgress = 0; // Initialize the initial progress

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
        // this.getPersonalData((this.id = this.route.snapshot.params['id']));
        // console.log(this.id);

        // gets the farmers portfolio information

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

            cell_number: new FormControl('', [
                Validators.required,
                this._validationsService.phoneNumberValidator(),
            ]),
        });

        this.personalInfo = {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            cellNumber: '',
            farms: [],
        };

        this._portfolioService.setFarmerFarm();

        this.portfolioSubscription = this._portfolioService
            .getFarmerPortfolio()
            .subscribe(data => {
                // console.table(data);

                // Assuming 'data' contains fields like first_name, last_name, email, id_number, cell_number
                this.myForm.patchValue({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    cell_number: data.cellNumber,
                });

                const progress = this.calculateProgress();
                this._progressService.setPersonalInfoCompleted(progress);

                //Update progress for personal info completion
                // this._progressService.setPersonalInfoCompleted(true);

                // Set the 'isDisabled' flag to false to enable form editing
                this.isDisabled = true;
                // Calculate the initial progress when the component is initialized
                this.initialProgress = this.calculateProgress();
            });

        this.myForm.valueChanges.subscribe(() => {
            const progress = this.calculateProgress();
            this._progressService.setPersonalInfoCompleted(progress);
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

    enableFields() {
        this.isDisabled = false;
        this.myForm.enable();
        // Update the progress when "Edit" is clicked based on the initial progress
        const progress = this.calculateProgress() - this.initialProgress;
        this._progressService.setPersonalInfoCompleted(progress);
    }

    onSaveClicked(formData: any) {
        this.submitted = true;
        if (this.myForm.valid) {
            this.personalInfo = {
                id: this.personalInfo.id,
                farms: this.personalInfo.farms,
                firstName: this.myForm.get('first_name')?.value,
                lastName: this.myForm.get('last_name')?.value,
                email: this.myForm.get('email')?.value,
                cellNumber: this.myForm.get('cell_number')?.value,
            };

            setTimeout(() => {
                console.log('Form saved:', this.myForm.value);
                // Assuming the save was successful, increase the progress
                const progress = this.calculateProgress() + 20;
                this._progressService.setPersonalInfoCompleted(progress);
            }, 1000);
            console.table(this.personalInfo);
            this._portfolioService.editPortfolio(this.personalInfo);

        }
        this.isDisabled = true;
        // this._progressService.setPersonalInfoCompleted(true);
        this.myForm.disable();
    }
    onCancelClicked() {
        // Reset the form values to the original values (cropInfo)
        this.myForm.patchValue({
            first_name: this.personalInfo.firstName,
            last_name: this.personalInfo.lastName,
            email: this.personalInfo.email,
            cell_number: this.personalInfo.cellNumber,
        });

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }

    // Validations
}
