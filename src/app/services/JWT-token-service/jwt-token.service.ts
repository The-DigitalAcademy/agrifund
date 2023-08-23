/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 23 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        This service is used to decode JWT tokens and retrieve data from JWT.

    PARAMETERS:
         
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class JWTTokenService {
    token: string;
    decodedToken: string;

    constructor() {}

    // sets the token value
    setToken(token: string) {
        // checks if token is not empty
        if (token) {
            this.token = token;
        }
    }

    //  decodes the token value
    decodeToken() {
        if (this.token) {
            this.decodedToken = jwtDecode(this.token);
        }
    }

    // gets the decoded token value
    getDecodedToken() {
        return jwtDecode(this.token);
    }

    // TODO
    // checks if the token is expired

    // TODO
    // gets the user from the JWT token
}
