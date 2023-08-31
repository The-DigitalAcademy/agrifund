/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 30 Jul 2023
    UPDATED DATE: 31 Aug 2023 

    DESCRIPTION:
     This service is used for managing the overall farmer's portfolio data.
     All portfolio data is fetched from the api here.

    PARAMETERS:
    registerUser( newUser: User) -> receives an body that is an instance of User
    loginUser( email: string, password:string) -> both parameters passed should be a string

-------------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { AuthService } from '../authentication-service/auth.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FarmerPortfolio, Farm, Assets } from 'src/app/_models/FarmerPortfolio';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    private assets: Assets[] = [];
    // stores the farmer portfolio as a array instance of farmer portfolio
    private farmerPortfolio: FarmerPortfolio[] = [];
    // stores the farmer portfolio data values as a behavior subject -> initializes as empty
    private farmerPortfolio$: BehaviorSubject<FarmerPortfolio> =
        new BehaviorSubject<FarmerPortfolio>({
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            cellNumber: '',
            farms: [],
        });
    // stores the farmers farm data
    private farmerFarm: Farm[] = [];
    // stores the farmers farm data as an observable -> initializes as empty
    private farmerFarm$: BehaviorSubject<Farm> = new BehaviorSubject<Farm>({
        id: 0,
        numberOfEmployees: 0,
        farmName: '',
        farmAddress: '',
        yearsActive: 0,
        address: '', //stores residential address
        farmingReason: '', //stores the reason for needing funding
        crops: [],
        assets: [],
        incomeStatements: [],
    });
    constructor(
        private _apiService: ApiService,
        private _authService: AuthService
    ) {
        // sets the farmer portfolio when the service is called
        this.setFarmerPortfolio();
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
    getFarmerPortfolio(): Observable<FarmerPortfolio> {
        return this.farmerPortfolio$;
    }

    getFarmerFarm(): Observable<Farm[]> {
        // returns the user's farm data from the portfolio
        return this.farmerPortfolio$.pipe(map(portfolio => portfolio.farms));
    }

    getFarmName() {
        // console.log('Farmer portfolio:', this.getFarmerPortfolio());
        // // gets the farmer farm data
        // const farmerFarm = this.getFarmerFarm();
        // const farmData = { ...this.farmerFarm.values };
        // console.log(`farmer's farm data, ${farmerFarm}`);
        // // value to set farm name
        // let farmName = '';
        // // checks to see if the farm data is true
        // if (farmData) {
        //     // gets the farm name from the first instance of the farmerFarm array
        //     farmName = farmerFarm[0].farmName;
        //     console.log(farmName);
        // }
        // return farmName;
    }
}
