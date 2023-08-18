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
import { ApiService } from 'src/app/services/api/api.service';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import { PortfolioServiceService } from 'src/app/services/portfolio/portfolio-service.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    users!: Users;
    RegisterForm!: FormGroup;
    submitted = false;

    // stores the user id
    userId = 1;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private router: Router,
        private _apiService: ApiService,
        private _portfolioService: PortfolioServiceService
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
            // Gather user data from the form
            this.users = {
                id: this._portfolioService.generateId(),
                firstName: this.RegisterForm.get('first_name')?.value,
                lastName: this.RegisterForm.get('last_name')?.value,
                email: this.RegisterForm.get('email')?.value,
                cellNumber: this.RegisterForm.get('cell_number')?.value,
                password: this.RegisterForm.get('password')?.value,
                idNumber: this.RegisterForm.get('id_number')?.value,
            };

            // Call the API service to register the user
            this._apiService.registerUser(this.users).subscribe(data => {
                // Handle success or error response from the API
                this.router.navigate(['/login']); // Navigate to login page after successful registration
            });
        }
    }
}
