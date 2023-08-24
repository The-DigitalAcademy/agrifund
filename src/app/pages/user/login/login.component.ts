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
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
// import { UserService } from 'src/app/services/users.service';
import { ApiService } from 'src/app/services/api/api.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
    LoginForm!: FormGroup; // Form group to hold login form controls
    message = ''; // Message to display error or validation messages
    // used to store subscriptions to services
    private subscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private router: Router,
        // private userService: UserService, // Service to handle user-related functionalities
        private _apiService: ApiService, // Service to make API requests
        private _userService: UserService
    ) {}

    ngOnInit() {
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        if (this.LoginForm.valid) {
            const formValue = this.LoginForm.value;
            // sets the data that will be sent to the api
            const loginBody = {
                email: formValue.email,
                password: formValue.password,
            };

            this.subscription.add(
                this._apiService.loginUser(loginBody).subscribe((data: any) => {
                    console.log(data);
                })
            );

            // this._userService.setUserState('mock_token');
            // this.router.navigate(['/dashboard']);

            // Call the login method of the ApiService to authenticate the user
            // this.apiService
            //     .login(formValue.email, formValue.password)
            //     .subscribe(
            //         (response: any) => {
            //             console.log(response);
            //             localStorage.setItem('token', response.token);

            //             if (this.userService.isAuthenticated(response.token)) {
            //                 // Redirect to the dashboard upon successful authentication
            //                 this.router.navigate(['/dashboard']);
            //             } else {
            //                 // Handle non-authenticated scenario, for example:
            //                 localStorage.removeItem('token');
            //                 alert('Authentication failed');
            //             }
            //         },
            //         (error: HttpErrorResponse) => {
            //             // Handle errors, such as incorrect username or password
            //             this.message = 'Wrong username or password';
            //         }
            //     );
        }
    }
}
