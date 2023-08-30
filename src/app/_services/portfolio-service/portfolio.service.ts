import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Asset } from 'src/app/_models/Asset';
import { AuthService } from '../authentication-service/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FarmerPortfolio } from 'src/app/_models/FarmerPortfolio';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    private assets: Asset[] = [];
    // stores the farmer portfolio as a array instance of farmer portfolio
    private farmerPortfolio: FarmerPortfolio[] = [];
    // stores the farmer portfolio data values as a behavior subject
    private farmerPortfolio$ = new BehaviorSubject<FarmerPortfolio[]>([]);
    constructor(
        private _http: HttpClient,
        private _apiService: ApiService,
        private _authService: AuthService
    ) {
        // this._apiService.getAllEquipment().subscribe((data: any) => {
        //     this.assets = data;
        // });
    }

    generateId() {
        const id: number = this.assets.length;

        return id;
    }
    generateFarmId() {
        const farm_id: number = this.assets.length;
        return farm_id;
    }

    // sets the farmer portfolio data
    setFarmerPortfolio() {
        const userEmail = this._authService.getUserEmail();
        const sessionToken = this._authService.getSessionToken();

        // checks if the user email and session token is still valid
        if (!userEmail || !sessionToken) {
            console.error('User email or session token not available');
        }

        this._apiService.getFarmerPortfolio().subscribe(
            (result: any) => {
                console.log('API Response:', result);
                this.farmerPortfolio = result;
                console.log('API Response:', result);
                this.farmerPortfolio$.next(result);
            },
            error => {
                console.error(`Error occurred while getting a user:`, error);
            }
        );
    }

    // gets method for farmer portfolio data
    getFarmerPortfolio(): Observable<FarmerPortfolio[]> {
        this.setFarmerPortfolio();
        return this.farmerPortfolio$;
    }

    // gets the farm name for the current portfolio
    getFarmName() {}

}
