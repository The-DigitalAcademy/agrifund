import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../api-service/api.service';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { Assets } from 'src/app/_models/Assets';

@Injectable({
    providedIn: 'root',
})
export class AssetService {
    private assets: Assets[] = [];

    private farmerAssets$ = new BehaviorSubject<Assets[]>([]);
    constructor(
        private _apiService: ApiService,
        private _portfolioService: PortfolioService
    ) {}
 
   
    createFarmerAsset(assetBody: Assets) {
        const farmName = this._portfolioService.getFarmName();
        const addedAsset = {
            assetName: assetBody.assetName,
            assetType: assetBody.assetType,
            age: assetBody.age,
            purchasePrice: assetBody.purchasePrice
        };
        this._apiService.addAsset(farmName, addedAsset).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.error(
                    'Error occured when creating new asset data',
                    error
                );
            }
        );
    }
    // set plot info in observable
    setAssetInfo() {
        // gets the current farm name for a user
        const farmName = this._portfolioService.getFarmName();
        // api connecition for getting crop info
        this._apiService.getAllFarmAssets(farmName).subscribe(
            (data: any) => {
                this.assets = data;
                // adds crop to crop data observable
                this.farmerAssets$.next(this.assets);
            },
            error => {
                console.error('Error occured fetching asset data');
                console.error(error);
            }
        );
    }
    // get asset info
    getAssetInfo() {
        // esnures that the asset info is set when get method is called
        this.setAssetInfo();

        // return the behaviour subject containing the asset info data if it is not blank
        return this.farmerAssets$;
    }
}