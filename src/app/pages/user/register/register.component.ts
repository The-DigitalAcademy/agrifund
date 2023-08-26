/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 10 Aug 2023 

    DESCRIPTION:
    All the methods related to registering a farmer

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { User } from 'src/app/_models/User';
import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    user!: User;
    RegisterForm!: FormGroup;
    submitted = false;
    // used to store subscriptions to services
    private subscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private router: Router,
        private _apiService: ApiService,
        private _portfolioService: PortfolioService
    ) {}

    ngOnInit(): void {
        // Initialize the registration form with validation rules
        this.RegisterForm = this.fb.group(
            {
                first_name: new FormControl('', [
                    Validators.required,
                    this.validationsService.textWithoutNumbersValidator(),
                ]),
                last_name: new FormControl('', [
                    Validators.required,
                    this.validationsService.textWithoutNumbersValidator(),
                ]),
                id_number: new FormControl('', [
                    Validators.required,
                    this.validationsService.idNumberValidator(),
                ]),
                email: new FormControl('', [
                    Validators.required,
                    this.validationsService.emailValidator(),
                ]),
                cell_number: new FormControl('', [
                    Validators.required,
                    this.validationsService.phoneNumberValidator(),
                ]),
                password: new FormControl('', [
                    Validators.required,
                    this.validationsService.passwordValidator(),
                ]),
                cpassword: ['', [Validators.required]],
            },
            {
                validators: [this.validationsService.passwordsMatchValidator], // Add custom password matching validation method from your validation service
            }
        );
    }

    onSubmit() {
        this.submitted = true;
        if (this.RegisterForm.valid) {
            const inputValue = this.RegisterForm.value;
            // Gather user data from the form
            this.user = {
                id: this._portfolioService.generateId(),
                firstName: inputValue.first_name,
                lastName: inputValue.last_name,
                email: inputValue.email,
                cellNumber: inputValue.cell_number,
                password: inputValue.password,
                idNumber: inputValue.id_number,
            };

            // Call the API service to register the user
            this.subscription.add(
                this._apiService
                    .registerFarmer(this.user)
                    .subscribe((data: any) => {
                        console.log(data);
                    })
            );
        }
    }
}
