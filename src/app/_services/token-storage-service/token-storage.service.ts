/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 23 Aug 2023 
    UPDATED DATE: 26 Aug 2023

    DESCRIPTION:
        This service controls the storage of the jwt as a cookie

    PARAMETERS:
    key: string -> the key name for the token
    value: string -> the value for the token key
         
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenStorageService {
    // token cookie will be stored in here
    private cookieStore: { [key: string]: string } = {};
    constructor() {
        this.parseCookies(document.cookie);
    }

    public parseCookies(cookies = document.cookie) {
        // coverts cookies into a boolean value and checks if a cookie value exists
        if (!!cookies === false) {
            return false;
        }
        // splits the substring of the cookie
        const cookieArray = cookies.split(';');
        for (const cookie of cookieArray) {
            const cookieArray = cookie.split('=');
            // gets the token value specifically without the key value
            this.cookieStore[cookieArray[0].trim()] = cookieArray[1];
        }

        // returns true if the cookie contains a value
        return true;
    }

    getToken(key: string) {
        this.parseCookies();
        return this.cookieStore[key] ? this.cookieStore[key] : null;
    }

    removeToken(key: string) {
        document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    }

    setToken(key: string, value: string) {
        this.removeToken('session')
        document.cookie = key + '=' + (value || '');
    }
}
