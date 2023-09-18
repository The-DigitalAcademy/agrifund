/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 10 Aug 2023 

    DESCRIPTION:
    All the methods related to logging in a farmer

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/authentication-service/auth.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
    LoginForm!: FormGroup; // Form group to hold login form controls
    message = ''; // Message to display error or validation messages
    // used to store subscriptions to services
    private subscription = new Subscription();
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private _validationsService: ValidationService,
        private router: Router,
        // private userService: UserService, // Service to handle user-related functionalities
        private _apiService: ApiService, // Service to make API requests
        private _authService: AuthService
    ) {}

    ngOnInit() {
        // Initialize the login form with email and password fields
        this.LoginForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    this._validationsService.emailValidator(),
                ],
            ],
            password: [
                '',
                [
                    Validators.required,
                    this._validationsService.passwordValidator(),
                ],
            ],
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        if (this.LoginForm.valid) {
            const formInputVal = this.LoginForm.value;
            // passes the from data to the authentication service
            this.subscription.add(
                this._authService.loginUser(
                    formInputVal.email,
                    formInputVal.password
                )
            );
        }
    }
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
}

