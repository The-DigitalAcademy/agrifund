
/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique, Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 17 Aug 2023 

    DESCRIPTION:
    This service is for all methods related to a user

    PARAMETERS:
    userState$ -> stores the user state as an observable to keep the validity of a user token for a session

-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // value = 'mock-token';
    value: any = null;
    // observable to store the user state
    private userState$: BehaviorSubject<string>;

    constructor() {
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
}