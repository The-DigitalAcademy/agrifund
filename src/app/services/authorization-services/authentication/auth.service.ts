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
import { Router } from '@angular/router';
import { JWTTokenService } from '../JWT-token-service/jwt-token.service';
import { TokenStorageService } from '../token-storage-service/token-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private router: Router,
        private _authService: AuthService,
        private _tokenStorage: TokenStorageService,
        private _jwtService: JWTTokenService
    ) {}

    isUserLoggedIn() {
        let loginState = false;
        // checks that the user email value is not empty
        if (this._jwtService.getUserEmail()) {
            // if the token is not expired the login state will be true
            if (!this._jwtService.isTokenExpired()) {
                // allows user access when returning true
                loginState = true;
            }
        }
        return loginState;
    }

    setToken(tokenValue: string) {
        this._tokenStorage.set('tokenName', tokenValue);
    }

    getLoginToken() {
        this._tokenStorage.get('tokenName');
    }

    // TODO
    // check if a user is an administrator

    // TODO
    // check if a user is a farmer
}
