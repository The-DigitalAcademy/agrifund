import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from '../api-service/api.service';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { Farm } from 'src/app/_models/Farm';
import { Crop } from 'src/app/_models/crop';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class CropService {
    private crops: Crop[] = [];
    // stores farmer crops as a behavior subject
    private farmerCrops$ = new BehaviorSubject<Crop[]>([]);

    constructor(
        private _apiService: ApiService,
        private _portfolioService: PortfolioService,
        private _http: HttpClient
    ) {}

    createFarmerCrop(crop: Crop) {
        this._portfolioService.setFarmerPortfolio();
        this._portfolioService.setFarmerFarm();
        const farmName = this._portfolioService.getFarmName();
        console.log(`Farm Name for crop: ${farmName}`);

        this._apiService.addCrop(farmName, crop).subscribe(
            (data: any) => {
                console.log(data);
                this.crops.push(data);
                this.farmerCrops$.next(this.crops);
            },
            error => {
                console.error(
                    'Error occured when creating new crop data',
                    console.error(error)
                );
            }
        );
    }
    addCrop(crop: Crop) {
        const AddedCrop = {
            id: crop.id,
            name: crop.name,
            season: crop.season,
            type: crop.type,
        };
        this.crops.push(AddedCrop);
        this.farmerCrops$.next(this.crops);
    }
}
