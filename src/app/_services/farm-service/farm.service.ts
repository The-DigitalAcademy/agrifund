/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 31 Jul 2023
    UPDATED DATE: 

    DESCRIPTION:
     This service is used to manage all CRUD functionality for a farmer's farm

    PARAMETERS:
    registerUser( newUser: User) -> receives an body that is an instance of User
    loginUser( email: string, password:string) -> both parameters passed should be a string

-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Farm, FarmerPortfolio } from 'src/app/_models/FarmerPortfolio';
import { PortfolioService } from '../portfolio-service/portfolio.service';

@Injectable({
    providedIn: 'root',
})
export class FarmService {
    // farmer portfolio will be stored in her
    private farmerPortfolio$: Observable<FarmerPortfolio>;
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
    constructor(private _portfolioService: PortfolioService) {
        // gets the farmer portfolio from the portfolio service
        this.farmerPortfolio$ = this._portfolioService.getFarmerPortfolio();
    }

    getFarmerFarm(): Observable<Farm[]> {
        // returns the user's farm data from the portfolio
        return this.farmerPortfolio$.pipe(map(portfolio => portfolio.farms));
    }

    // gets the name of a farm stored within the farm data
    getFarmName() {
        // gets the farmer farm data and a
        this.getFarmerFarm().subscribe((farm: Farm[]) => {
            // assigns data from get farmer farm to the farmer farm array
            this.farmerFarm = farm;
        });
        // gets the name of a farm
        const farmName = this.farmerFarm.map(farm => {
            return farm.farmName;
        });
        // returns the farm name within the first index of the farm name array
        return farmName[0];
    }
}
