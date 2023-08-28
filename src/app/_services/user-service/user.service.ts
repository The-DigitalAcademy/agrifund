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
    ) {}

    getFarmerByEmail() {
        const userEmail = this._authService.getUserEmail();
        console.log(this._authService.getSessionToken());
        if (userEmail) {
            this._apiService.getFarmerByEmail().subscribe(
                (result: any) => {
                    console.log(result);
                    // assigns the result to the structure of the api response object
                    this.user$.next(result);
                    console.log(this._authService.getSessionToken());

                    return this.user$;
                },
                error => {
                    console.error(
                        `Error occurred while getting a user, ${error}`
                    );
                    // TODO: when a login fails it should print an error message from the api at the top of a form
                }
            );
        }
    }
}
