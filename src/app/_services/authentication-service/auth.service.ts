/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 21 Aug 2023 
    UPDATED DATE: 19 September 2023

    DESCRIPTION:
        Methods within this service is used to perform functions related to user authentication and 
        authorizing the use of api tokens.
        This service sets the user state and call the jwt service to get the current value of the 
        token

    PARAMETERS:
    _jwtService: JWTTokenService -> used to retrieve token and set its value
    _apiService: ApiService -> used to make login request 
    router: Router -> used to route to a different page if a user logs in
         
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { JwtService } from '../JWT-service/jwt.service';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // stores the user state value as a behavior subject
    userState$ = new BehaviorSubject<boolean>(false);
    // stores the session token as an observable
    sessionToken$!: string | null;
    // stores the error message sent by the api
    errorMessage = '';
    // api response structure
    apiResponse = {
        data: '',
        message: '',
        code: '',
    };

    constructor(
        private router: Router,
        private _apiService: ApiService,
        private _jwtService: JwtService
    ) {
        this.setSessionToken();
    }

    // sets the session token to the one set in the jwt service
    setSessionToken() {
        this._jwtService.getToken().subscribe(token => {
            this.sessionToken$ = token;
        });
    }

    // gets the set session token
    getSessionToken() {
        this.setSessionToken();
        return this.sessionToken$;
    }

    // logs a user into the application
    loginUser(loginEmail: string, loginPassword: string) {
        // set the body that will be passed to the api connection
        const loginBody = {
            email: loginEmail,
            password: loginPassword,
        };

        this._apiService.loginUser(loginBody).subscribe({
            next: (result: any) => {
                // assigns the result to the structure of the api response object
                this.apiResponse = result;
                // sets the token to the one received from the api
                this._jwtService.setToken(this.apiResponse.data);
                // sets the user login state to true
                this.setUserState();
                // routes to dashboard if the login was successful
                this.router.navigate(['/about-farm']);

                // Display a success SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    text: 'You are now logged in.',
                    confirmButtonColor: '#606C38',
                });
            },
            error: (error: any) => {
                console.error(`Error occurred while logging in`);
                console.log(error);
                if (error.status === 404) {
                    // Resource not found error
                    this.errorMessage =
                        'User not found. Please check if the email or password you have entered is correct or register if you are a new user.';
                } else if (error.status === 401) {
                    // Unauthorized error
                    this.errorMessage =
                        'Unauthorized access. Please check if the email or password you have entered is correct.';
                } else if (error.status === 403) {
                    // Forbidden error
                    this.errorMessage =
                        'Access forbidden. You do not have permission to access this resource.';
                } else if (
                    error.status === 400 &&
                    error.error &&
                    error.error.message
                ) {
                    // Bad request with a custom error message from the API
                    this.errorMessage = error.error.message;
                } else if (error.status === 500 || error.status === 504) {
                    // Internal server error or gateway timeout
                    this.errorMessage =
                        'An internal server error occurred. Please try again later.';
                } else {
                    // Other generic error
                    this.errorMessage =
                        'An error occurred while logging in. Please try again later.';
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: this.errorMessage,
                    confirmButtonColor: '#606C38',
                });
            },
        });
    }

    logoutUser() {
        // sets the user token to null
        this._jwtService.setToken(null);
        // calls the set user state method to change it to false
        this.setUserState();
    }

    // sets the boolean user login state value
    setUserState() {
        if (this.sessionToken$ != null) {
            // checks to see if user email is in the token
            if (this._jwtService.getUserEmail()) {
                // checks to see if token is not expired
                if (!this._jwtService.isTokenExpired()) {
                    // sets the user state to true if the token contains an email and is still valid
                    this.userState$.next(true);
                }
            }
        } else {
            // set the user state to false if the token has value of null
            this.userState$.next(false);
        }
    }

    // used to get the user state value
    getUserState(): Observable<boolean> {
        this.setUserState();
        return this.userState$;
    }

    // gets the user email that was extracted from the token within the jwt service
    getUserEmail(): string | null {
        return this._jwtService.getUserEmail();
    }

    // TODO
    // check if a user is an administrator

    // TODO
    // check if a user is a farmer
}
