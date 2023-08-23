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

@Injectable({
    providedIn: 'root',
})
export class AuthService {
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
