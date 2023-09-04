import { CropService } from 'src/app/_services/crop-service/crop.service';

import { PlotService } from './../plot-service/plot.service';
/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 21 Aug 2023 
    UPDATED DATE: 26 Aug 2023

    DESCRIPTION:
        Methods within this service is used to perform functions related to user authentication and 
        authorizing the use of api tokens.
        This service sets the user state and call the jwt service to get the current value of the 
        token

    PARAMETERS:
    _jwtService: JWTTokenService -> used to retrieve token and set its value
    _apiService: ApiService -> used to make login request 
    router: Router -> used to route to a different page if a user logs in
         
-------------------------------------------------------------------------------------------------*/

import { Inject, Injectable, forwardRef } from '@angular/core';
import { JwtService } from '../JWT-service/jwt.service';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FarmService } from '../farm-service/farm.service';
import { AssetService } from '../asset-service/asset.service';



@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loginUser(email: any, password: any): import("rxjs").TeardownLogic {
        throw new Error('Method not implemented.');
    }
    // loginUser(email: any, password: any): import("rxjs").TeardownLogic {
    //     throw new Error('Method not implemented.');
    // }
    // stores the user state value as a behavior subject
    userState$ = new BehaviorSubject<boolean>(false);
    // stores the session token as an observable
    sessionToken$!: string | null;
    // stores the error message sent by the api
    errorMessage = '';
    // api response structure
    apiResponse = {
        data: '',
        message: '',
        code: '',
    };

    constructor(
        private router: Router,
        private _apiService: ApiService,
        private _jwtService: JwtService,
        // // @Inject(forwardRef(() => FarmService))
        // private _farmService: FarmService,
        // // @Inject(forwardRef(() => PlotService))
        // private _plotService: PlotService,
        // // @Inject(forwardRef(() => CropService))
        // private _cropService: CropService,
        // // @Inject(forwardRef(() => AssetService))
        // private _assetService: AssetService
    ) {
        this.setSessionToken();
    }

    // sets the session token to the one set in the jwt service
    setSessionToken() {
        this._jwtService.getToken().subscribe(token => {
            this.sessionToken$ = token;
        });
    }

    // gets the set session token
    getSessionToken() {
        this.setSessionToken();
        return this.sessionToken$;
    }

    // logs a user into the application


    logoutUser() {
        // sets the user token to null
        this._jwtService.setToken(null);
        // calls the set user state method to change it to false
        this.setUserState();
    }

    // sets the boolean user login state value
    setUserState() {
        if (this.sessionToken$ != null) {
            // checks to see if user email is in the token
            if (this._jwtService.getUserEmail()) {
                // checks to see if token is not expired
                if (!this._jwtService.isTokenExpired()) {
                    // sets the user state to true if the token contains an email and is still valid
                    this.userState$.next(true);
                }
            }
        } else {
            // set the user state to false if the token has value of null
            this.userState$.next(false);
        }
    }

    // used to get the user state value
    getUserState(): Observable<boolean> {
        this.setUserState();
        return this.userState$;
    }

    // gets the user email that was extracted from the token within the jwt service
    getUserEmail(): string | null {
        return this._jwtService.getUserEmail();
    }

    // TODO
    // check if a user is an administrator

    // TODO
    // check if a user is a farmer
}
