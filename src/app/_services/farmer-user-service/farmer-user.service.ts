/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel, Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 26 Aug 2023 

    DESCRIPTION:
    This service is for all methods related to a farmer user

    PARAMETERS:
    
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { AuthService } from '../authentication-service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class FarmerUserService {

    constructor(private _authService: AuthService) {
        
    }



    //TODO: gets & set a users name

    //TODO: gets & sets a user's email
}
