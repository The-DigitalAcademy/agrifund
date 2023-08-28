/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel, Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 26 Aug 2023 

    DESCRIPTION:
    This service is for all methods related to a farmer user

    PARAMETERS:
    
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../authentication-service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class FarmerUserService {
    value = 'mock-token';
    // value: any = null;
    // observable to store the user state
    private userState$: BehaviorSubject<string>;

    constructor(private _authService: AuthService) {
        this.userState$ = new BehaviorSubject(this.value);
    }

    // sets the users state
    setUserState(value: any) {
        this.userState$.next(value);
        // console.log(this.userState$.value);
    }

    // returns the user state value
    getUserState(): Observable<any> {
        return this.userState$;
    }

    //TODO: gets & set a users name

    //TODO: gets & sets a user's email
}
