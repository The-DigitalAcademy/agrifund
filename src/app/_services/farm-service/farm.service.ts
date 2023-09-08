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
        // api connection for getting farmer info
        // within api connection assign date to behavior subject for farm info
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

    // get farm info
    getFarmInfo() {
        // ensures that the farm info is set when get method is called
        this.setFarmInfo();

        // return the behavior subject containing the farm info data if it is not blank
        return this.farms;
    }
}
