import { JwtService } from './../JWT-service/jwt.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../authentication-service/auth.service';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // stores the user values as a behavior subject
    user$ = new BehaviorSubject<any>({});

    constructor(
        private _apiService: ApiService,
        private _authService: AuthService
    ) {
        // when the service is first call it will set the farmers info
        this.getFarmerByEmail();
    }

    getFarmerByEmail() {
        const userEmail = this._authService.getUserEmail();
        const sessionToken = this._authService.getSessionToken();

        if (!userEmail || !sessionToken) {
            console.error('User email or session token not available');
            return;
        }

        this._apiService.getFarmerPortfolio().subscribe(
            (result: any) => {
                console.log('API Response:', result);
                this.user$.next(result);
            },
            error => {
                console.error(`Error occurred while getting a user, ${error}`);
            }
        );
    }

    // sets user first name
    setUserFirstName() {}

    // get user first name
    getUserFirstName() {}

}