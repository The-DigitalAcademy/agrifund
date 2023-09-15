import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from '../api-service/api.service';
import { HttpClient } from '@angular/common/http';
import { FarmerCrop } from 'src/app/_models/farmerCrop';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CropService {
    private crop: FarmerCrop = {
        id: 0,
        name: '',
        season: '',
        price: 0,
        type: '',
        farmId: 0,
    };
    // private crops: FarmerCrop[] = [];
    // stores farmer crops as a behavior subject

    private cropData$: BehaviorSubject<FarmerCrop> =
        new BehaviorSubject<FarmerCrop>({
            id: 0,
            name: '',
            season: '',
            price: 0,
            type: '',
            farmId: 0,
        });

    constructor(
        private _apiService: ApiService,
        private _portfolioService: PortfolioService,
        private _http: HttpClient
    ) {
        this.setCropData();
    }

    /*---------------------------------
        ALL CROP DATA
    ----------------------------------*/

    // sets the crop data

    setCropData() {
        //: Observable<Crop>
        this._portfolioService.setFarmerPortfolio();
        this._portfolioService
            .getFarmerCropInfo()
            .subscribe((crops: FarmerCrop[]) => {
                // sets the crop object to the first crop object in the crop observable
                this.crop = crops[0];
                this.cropData$.next(this.crop);
            });
        console.table(this.cropData$);
    }

    getCropData(): Observable<FarmerCrop> {
        return this.cropData$;
    }
    private crops: FarmerCrop[] = [];
    // stores farmer plots as a behviour subject
    private farmerCrops$ = new BehaviorSubject<FarmerCrop[]>([]);

    createFarmerCrop(cropBody: FarmerCrop) {
        this._portfolioService.setFarmerPortfolio();
        const farmName = this._portfolioService.getFarmName();
        const addedCrop = {
            name: cropBody.name,
            season: cropBody.season,
            price: cropBody.price,
            type: cropBody.type,
        };

        this._apiService.addCrop(farmName, addedCrop).subscribe(
            (data: any) => {
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
    addCrop(crop: FarmerCrop) {
        const AddedCrop = {
            id: crop.id,
            farmId: crop.farmId,
            name: crop.name,
            season: crop.season,
            price: 0,
            type: crop.type,
        };
        this.crops.push(AddedCrop);
        this.farmerCrops$.next(this.crops);
    }
    updateCropData(crop: FarmerCrop) {
        const cropBody = {
            id: crop.id,
            name: crop.name,
            season: crop.season,
            type: crop.type,
            price: crop.price,
        };

        console.log(cropBody);

        this._apiService.updateCrop(crop.id, cropBody).subscribe(
            data => {
                console.log('Crop data updated successfully:', data);
            },
            error => {
                console.error('Error updating crop data:', error);
            }
        );
    }
}