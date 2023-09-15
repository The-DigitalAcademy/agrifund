import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assets } from 'src/app/_models/Assets';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { ApiService } from '../api-service/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AssetService {
    // stores farmer plots as a behavior subject
    private assetData$ = new BehaviorSubject<Assets[]>([]);

    private assets: Assets[] = [];

    constructor(
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private _http: HttpClient
    ) {}

    createFarmerAsset(asset: Assets) {
        const farmName = this._portfolioService.getFarmName();

        this._apiService.addAsset(asset, farmName).subscribe(
            (data: any) => {
                console.log(data);
                //contains the newly created asset data, you can add it to your local assets array
                this.assets.push(data);
                // Update the asset observable
                this.assetData$.next(this.assets);
            },
            error => {
                console.error('Error occurred when creating new asset data');
                console.error(error);
            }
        );
    }

    addAsset(asset: Assets) {
        const addedAsset = {
            id: asset.id,
            assetName: asset.assetName,
            assetType: asset.assetType,
            age: asset.age,
            purchasePrice: asset.purchasePrice,
        };
        //add asset to assets
        this.assets.push(addedAsset);
        // add assets to asset observable
        this.assetData$.next(this.assets);
    }
}
