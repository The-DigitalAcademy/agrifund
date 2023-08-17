/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 10 Aug 2023 

    DESCRIPTION:
    All the methods related to logging in a farmer

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { UserService } from 'src/app/services/users.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    LoginForm!: FormGroup; // Form group to hold login form controls
    message = ''; // Message to display error or validation messages

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private router: Router,
        private userService: UserService, // Service to handle user-related functionalities
        private apiService: ApiService // Service to make API requests
    ) {}

    ngOnInit(): void {
        // Initialize the login form with email and password fields
        this.LoginForm = this.fb.group({
            email: [
                '',
                [Validators.required, this.validationsService.emailValidator()],
            ],
            password: [
                '',
                [
                    Validators.required,
                    this.validationsService.passwordValidator(),
                ],
            ],
        });
    }

    onSubmit() {
        if (this.LoginForm.valid) {
            const formValue = this.LoginForm.value;

            // Call the login method of the ApiService to authenticate the user
            this.apiService
                .login(formValue.email, formValue.password)
                .subscribe(
                    (response: any) => {
                        console.log(response);
                        localStorage.setItem('token', response.token);

                        if (this.userService.isAuthenticated(response.token)) {
                            // Redirect to the dashboard upon successful authentication
                            this.router.navigate(['/dashboard']);
                            alert('Authentication successful');
                        } else {
                            // Handle non-authenticated scenario, for example:
                            localStorage.removeItem('token');
                            alert('Authentication failed');
                        }
                    },
                    (error: HttpErrorResponse) => {
                        // Handle errors, such as incorrect username or password
                        this.message = 'Wrong username or password';
                    }
                );
        }
    }
}
