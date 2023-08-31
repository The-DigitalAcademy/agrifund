import { Injectable } from '@angular/core';
import { AuthService } from '../authentication-service/auth.service';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/_models/User';

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

//     setPortfolioData(){
//         this._apiService.getFarmerByEmail().subscribe((data: any) => {

//             this.inputs = data;
//             this.inputs.forEach(input => {
//              this.addInput(input);
//             });
//     });
// }

// addInput(input: User){

//     const addedInput = {
//     id: input.id,
//     firstName: input.firstName,
//     lastName: input.lastName,
//     email: input.email,
//     cellNumber: input.cellNumber,
//     password: input.password,
//     idNumber: input.idNumber,
//     }

// }
}
