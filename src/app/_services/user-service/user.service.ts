import { JwtService } from './../JWT-service/jwt.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../authentication-service/auth.service';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject } from 'rxjs';
import { PortfolioService } from '../portfolio-service/portfolio.service';

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
}
