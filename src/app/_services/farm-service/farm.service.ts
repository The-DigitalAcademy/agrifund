import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Farm } from 'src/app/_models/Farm';

@Injectable({
    providedIn: 'root',
})
export class FarmService {
    // stores the farmer user's farm date
    private farms: Farm[] = [];

    constructor(private _apiService: ApiService) {}

    // set farm info in observable
    setFarmInfo() {
        // api connecition for getting farmer info
        // within api connec tin assign date to behviour subject for farm info
    }

    // get farm info
    getFarmInfo() {
        // esnures that the farm infor is set when get method is called
        this.setFarmInfo();

        // return the behaviour subject containing the farm info data if it is not blank
        return this.farms;
    }

    // creates data for a farmers farm and sends to api
    createFarmerFarm(farmBody: Farm) {
        this._apiService.addFarm(farmBody).subscribe(
            result => {
                console.table(`Creates this farm data: ${farmBody}`);
            },
            error => {
                
                console.error(error);
            }
        );
    }
}
