/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 21 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        Methods within this service is used to perform functions related to user authentication and 
        authorizing the use of api tokens

    PARAMETERS:
    key: string -> used to pass the key for a token
         
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { JWTTokenService } from '../JWT-token-service/jwt-token.service';
import { TokenStorageService } from '../token-storage-service/token-storage.service';
import { ApiService } from '../../api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // stores the user state value as a behavior subject
    userState$ = new BehaviorSubject<any>(false);
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
        private _tokenStorage: TokenStorageService,
        private _jwtService: JWTTokenService
    ) {}

    // logs a user into the application
    loginUser(loginEmail: string, loginPassword: string) {
        // set the body that will be passed to the api connection
        const loginBody = {
            email: loginEmail,
            password: loginPassword,
        };
        this._apiService.loginUser(loginBody).subscribe(
            (result: any) => {
                // assigns the result to the structure of the api response object
                this.apiResponse = result;
                // sets the token to the one received from the api
                this._jwtService.setToken(this.apiResponse.data);
                // stores the token for the session
                this._tokenStorage.setToken('session', this.apiResponse.data);
                // sets the user login state to true
                this.setUserState();
                // routes to dashboard if the login was successful
                this.router.navigate(['/dashboard']);
            },
            error => {
                console.error(
                    `Error occurred while logging in: ${error.string}`
                );
            }
        );
    }

    logoutUser() {
        // removes the token from storage
        this._tokenStorage.removeToken('session');
        // calls the set user state method to change it to false
        this.setUserState();
    }

    // sets the boolean user login state value
    setUserState() {
        if (this._tokenStorage.getToken('session') != null) {
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
    getUserState() {
        return this.userState$.asObservable();
    }

    // TODO
    // check if a user is an administrator

    // TODO
    // check if a user is a farmer
}
