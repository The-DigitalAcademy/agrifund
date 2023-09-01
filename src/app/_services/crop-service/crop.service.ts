import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Crop } from 'src/app/_models/crop';
import { ApiService } from '../api-service/api.service';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { Farm } from 'src/app/_models/Farm';

@Injectable({
    providedIn: 'root',
})
export class CropService {
    private crops: Crop[] = [];
    // stores farmer crops as a behviour subject
    private farmerCrops$ = new BehaviorSubject<Crop[]>([]);

    constructor(
        private _apiService: ApiService,
        private _portfolioService: PortfolioService
    ) {}

    createFarmerCrop(cropBody: Crop) {
        const farmName = this._portfolioService.getFarmName();
        const addedCrop = {
            name: cropBody.name,
            season: cropBody.season,
            type: cropBody.type,
        };
        this._apiService.addCrop(farmName, addedCrop).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.error(
                    'Error occured when creating new crop data',
                    error
                );
            }
        );
    }
    // set plot info in observable
    setCropInfo() {
        // gets the current farm name for a user
        const farmName = this._portfolioService.getFarmName();
        // api connecition for getting crop info
        this._apiService.getAllCrops(farmName).subscribe(
            (data: any) => {
                this.crops = data;
                // adds crop to crop data observable
                this.farmerCrops$.next(this.crops);
            },
            error => {
                console.error('Error occured fetching crops data');
                console.error(error);
            }
        );
    }
    // get farm info
    getCropInfo() {
        // esnures that the farm infor is set when get method is called
        this.setCropInfo();

        // return the behaviour subject containing the farm info data if it is not blank
        return this.farmerCrops$;
    }

}
