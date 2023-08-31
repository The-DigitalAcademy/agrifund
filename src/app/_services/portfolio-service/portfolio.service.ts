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
                this.setFarmName();
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

    setFarmerFarm() {
        // this just get the observable data in plain form
        // this.farmerPortfolio$.value[0] -> returns undefined
        // map the data from farmer portfolio to get the farm data and each
        //subsequent object stored within the portfolio
        this.farmerPortfolio$.value;
    }

    setFarmName() {
        console.log('farmer portfolio:', this.getFarmerPortfolio())
        // sets the farmer data to the first instance of the farmer portfolio data
        const farmer = this.farmerPortfolio$.value[0];
        console.log('farmer data', farmer);

        if (farmer && farmer.farms.length > 0) {
            // takes the first instance of the farms data and takes the value of the farm name
            this.farmName = farmer.farms[0].farmName;
            // console.log(this.farmName);
        }
        return this.farmName;
    }

    // gets the farm name for the current portfolio
    getFarmName(): string {
        // calls method to set the farm name
        // this.setFarmName();
        // console.log('Farm Name:', this.farmName);
        // returns the farm name observable
        return this.farmName;
    }
}
