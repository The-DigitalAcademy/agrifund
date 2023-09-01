import { JwtService } from './../JWT-service/jwt.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../authentication-service/auth.service';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject } from 'rxjs';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { User } from 'src/app/_models/User';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // stores the user values as a behavior subject
    user$ = new BehaviorSubject<any>({});
    
    constructor(
        private _jwtService: JwtService,
        private _portfolioService: PortfolioService
    ) {
        // sets the farmer user portfolio data
        this.setFarmerUserPortfolioData();
    }

    setFarmerUserPortfolioData() {
        if (this._jwtService.getToken()) {
            // sets the farmer portfolio when a user successfully logs in
            this._portfolioService.setFarmerPortfolio();
        }
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
