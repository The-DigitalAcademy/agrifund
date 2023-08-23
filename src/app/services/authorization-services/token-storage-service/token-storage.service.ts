/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 23 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        This service controls the storage of the jwt token

    PARAMETERS:
    key: string -> the key name for the token
    value: string -> the value for the token key
         
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JWTTokenService } from '../JWT-token-service/jwt-token.service';
import { AuthService } from '../authentication/auth.service';

@Injectable({
    providedIn: 'root',
})
export class TokenStorageService {
    constructor() {}

    // sets the token local storage
    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    // gets the token from local storage
    get(key: string) {
        return localStorage.getItem(key);
    }

    // removes the token from local storage
    remove(key: string) {
        localStorage.removeItem(key);
    }
}
