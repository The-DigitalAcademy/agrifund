import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Crop } from 'src/app/_models/crop';
import { ApiService } from '../api-service/api.service';
import { PortfolioService } from '../portfolio-service/portfolio.service';

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
   // creates data for a farmers farm and sends to api
    createFarmerCrop(farmName: Crop ) {
        this._apiService.addFarm(farmName).subscribe(
            result => {
                console.table(`Creates this farm data: ${farmName}`);
            },
            error => {
                console.error('error occured when create new farm data');
                console.error(error);
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
                // adds record to bookkeeping record observable
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

    // adds crop record from api to observable crop
    addCrop(crop: Crop) {
        const addedCrop = {
            id: crop.id,
            farm_id: crop.farm_id, //income statement id
            name: crop.name,
            season: crop.season,
            type: crop.type,
        };
    }
}
