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
    // stores the farm name as a behavior subject
    private farmName = '';

    constructor(
        private _http: HttpClient,
        private _apiService: ApiService,
        private _authService: AuthService
    ) {
        // sets the farmers portfolio when the service is called
        this.setFarmerPortfolio();
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
                // console.log('API Response:', result.data);
                this.farmerPortfolio = result.data;
                // console.table(this.farmerPortfolio);
                this.farmerPortfolio$.next(result.data);
                console.log('Observable Data:', this.farmerPortfolio$);
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

    setFarmName() {
        for (const farmer of this.farmerPortfolio) {
            console.table(farmer);
            for (const farm of farmer.farms) {
                this.farmName = farm.farmName
                console.log(this.farmName);
            }
        }
    }

    // gets the farm name for the current portfolio
    getFarmName(): string {
        // calls method to set the farm name
        this.setFarmName();
        // console.log('Farm Name:', this.farmName);
        // returns the farm name observable
        return this.farmName;
    }
}
