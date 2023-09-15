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
import { FarmerPortfolio } from 'src/app/_models/FarmerPortfolio';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { ApiService } from '../api-service/api.service';
import { FarmerFarm } from 'src/app/_models/farmerFarm';

@Injectable({
    providedIn: 'root',
})
export class FarmService {
    // farmer portfolio will be stored in her
    private farmerPortfolio$: Observable<FarmerPortfolio>;
    // stores the farmers farm data
    private farmerFarm: FarmerFarm[] = [];
    // stores the farmers farm data as an observable -> initializes as empty
    private farmerFarm$: BehaviorSubject<FarmerFarm> =
        new BehaviorSubject<FarmerFarm>({
            id: 0,
            numberOfEmployees: 0,
            farmName: '',
            farmAddress: '',
            yearsActive: 0,
            address: '', //stores residential address
            farmingReason: '', //stores the reason for needing funding
            crops: [],
            plots: [],
            assets: [],
            incomeStatements: [],
        });
    constructor(
        private _portfolioService: PortfolioService,
        private _apiService: ApiService
    ) {
        // gets the farmer portfolio from the portfolio service
        this.farmerPortfolio$ = this._portfolioService.getFarmerPortfolio();
    }

    getFarmerFarm(): Observable<FarmerFarm[]> {
        // returns the user's farm data from the portfolio
        return this.farmerPortfolio$.pipe(map(portfolio => portfolio.farms));
    }

    // gets the name of a farm stored within the farm data
    getFarmName() {
        // gets the farmer farm data and a
        this.getFarmerFarm().subscribe((farm: FarmerFarm[]) => {
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

    // creates data for a farmers farm and sends to api
    createFarmerFarm(farmBody: FarmerFarm) {
        let newFarmBody ={
            numberOfEmployees: farmBody.numberOfEmployees,
            farmName: farmBody.farmName,
            farmAddress: farmBody.farmAddress,
            yearsActive: farmBody.yearsActive,
            address: farmBody.address,
            farmingReason: farmBody.farmingReason,
        }
        this._apiService.addFarm(newFarmBody).subscribe(
            result => {
                console.table('Creates this farm data: ${farmBody}');
            },
            error => {
                console.error('error occurred when create new farm data');
                console.error(error);
            }
        );
    }

    editFarm(farmBody: FarmerFarm) {
        const farmName = this.getFarmName();
        console.log('Farm Name:', farmName);

        const updatedFarm = {
            id: farmBody.id,
            numberOfEmployees: farmBody.numberOfEmployees,
            farmName: farmName,
            farmAddress: farmBody.farmAddress,
            yearsActive: farmBody.yearsActive,
            address: farmBody.address, //stores residential address
            farmingReason: farmBody.farmingReason, //stores the reason for needing funding
            crops: farmBody.crops,
            plots: farmBody.plots,
            assets: farmBody.assets,
            incomeStatements: farmBody.incomeStatements,
        };
        
        // api connection goes here
        this._apiService.updateFarm(farmBody.id, updatedFarm).subscribe(
            data => {
                console.log('Farm data updated successfully:', data);
            },
            error => {
                console.error('Error updating farm:', error);
            }
        );
    }
}
