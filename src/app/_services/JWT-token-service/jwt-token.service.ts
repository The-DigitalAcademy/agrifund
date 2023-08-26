/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 23 Aug 2023 
    UPDATED DATE: 26 Aug 2023

    DESCRIPTION:
        This service is used to decode JWT values and toe set and get the token value

    PARAMETERS:
    _tokenStorage: TokenStorageService -> used to access token storage methods
         
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenStorageService } from '../token-storage-service/token-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JWTTokenService {
    // token value can either be null or a string value
    token$ = new BehaviorSubject<string | null>(null);
    // the decoded sting will be stored here as key value pairs - initialized as empty
    decodedToken: { [key: string]: string } = {};

    constructor(private _tokenStorage: TokenStorageService) {
        // observable token value is assigned to the token value retrieved from token in storage service
        this.token$.next(this._tokenStorage.getToken('session'));
    }

    // sets the token value -> can be empty or a string value
    setToken(token: string | null) {
        // sets the passed token as the observables' value
        this.token$.next(token);
        console.log(`This is the set token value: ${token}`);

        /* if the value is a string it will be set as the cookie value
            if the value is null it will be remove the token as a cookie*/
        token
            ? this._tokenStorage.setToken('session', token)
            : this._tokenStorage.removeToken('session');
    }

    getToken(): Observable<string | null> {
        return this.token$;
    }

    //  decodes the token value
    decodeToken() {
        // gets the value of the observable storing the token value
        const token = this.token$.value;
        if (token) {
            this.decodedToken = jwt_decode(token);
        }
    }

    // gets the decoded token value
    getDecodedToken() {
        if (this.token$.value != null) return jwt_decode(this.token$.value);

        return 'The token value is empty.';
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
