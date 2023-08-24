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
import { ResolveStart, Router } from '@angular/router';
import { JWTTokenService } from '../JWT-token-service/jwt-token.service';
import { TokenStorageService } from '../token-storage-service/token-storage.service';
import { ApiService } from '../../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
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
        const loginBody = {
            email: loginEmail,
            password: loginPassword,
        };
        this._apiService.loginUser(loginBody).subscribe(
            (result: any) => {
                // assigns the result to the structure of the api response object
                this.apiResponse = result;
                this._jwtService.setToken(this.apiResponse.data);
                this._tokenStorage.set('login', this.apiResponse.data);
            },
            error => {
                console.error(
                    `Error occurred while logging in: ${error.string}`
                );
            }
        );

        // return result;
    }

    logoutUser() {}

    isUserLoggedIn() {
        let loginState = false;
        // checks that the user email value is not empty
        if (this._jwtService.getUserEmail()) {
            // if the token is not expired the login state will be true
            if (!this._jwtService.isTokenExpired()) {
                // allows user access when returning true
                loginState = true;
            }
        } else {
            this.logoutUser();
        }
        return loginState;
    }

    // TODO
    // check if a user is an administrator

    // TODO
    // check if a user is a farmer
}
