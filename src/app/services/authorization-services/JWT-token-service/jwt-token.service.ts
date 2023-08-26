/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 23 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        This service is used to decode JWT tokens and retrieve data from JWT.

    PARAMETERS:
         
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from '../token-storage-service/token-storage.service';

@Injectable({
    providedIn: 'root',
})
export class JWTTokenService {
    // the token is stored as a string - initialized as empty
    token: any;
    // the decoded sting will be stored here as key value pairs - initialized as empty
    decodedToken: { [key: string]: string } = {};

    constructor(private _tokenStorage: TokenStorageService) {
        // gets the token value from the token storage service
        this.token = this._tokenStorage.getToken('session');
        console.log(this.token);
    }

    // sets the token value
    setToken(token: string) {
        // checks if token is not empty
        if (token) {
            this.token = token;
            // stores the token for the session
            this._tokenStorage.setToken('session', token);
        }
    }

    //  decodes the token value
    decodeToken() {
        if (this.token) {
            this.decodedToken = jwt_decode(this.token);
        }
    }

    // gets the decoded token value
    getDecodedToken() {
        return jwt_decode(this.token);
    }

    // gets the user email from the JWT token
    getUserEmail() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['sub'] : null;
    }

    // gets the user role from the JWT token
    getUserRole() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['roles'] : null;
    }

    // gets the date the token was created
    getIssuedDate() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['iat'] : null;
    }

    // gets the date the token will expire
    getExpiryTime() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken['exp'] : null;
    }

    // checks if the token had expired
    isTokenExpired() {
        const expiryTime = this.getExpiryTime();
        if (expiryTime) {
            return 1000 * Number(expiryTime) - new Date().getTime() < 5000;
        } else {
            return false;
        }
    }
}
