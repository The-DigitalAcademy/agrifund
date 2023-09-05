import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { Assets } from 'src/app/_models/Assets';

@Injectable({
    providedIn: 'root',
})
export class AssetService {
    private assets: Assets[] = [];

    private farmerAssets$ = new BehaviorSubject<Assets[]>([]);
    constructor(private _apiService: ApiService) {}
    createFarmerAsset(asset: Assets) {}
    // set asset info in observable
    setAssetInfo() {
        // api connecition for getting plot info
        // within api connec assign date to behviour subject for farm info
    }
    // get farm info
    getAssetInfo() {
        // esnures that the farm infor is set when get method is called
        this.setAssetInfo();

        // return the behaviour subject containing the farm info data if it is not blank
        return this.assets;
    }
    // adds crop record from api to observable bookkeeping
    addAsset(asset: Assets) {
        const addedAsset = {
            id: asset.id,
            assetName: asset.assetName,
            assetType: asset.assetType,
            age: asset.age,
            purchasePrice: asset.purchasePrice,
        };

        // adds record to records
        this.assets.push(addedAsset);
        // adds record to bookkeeping record observable
        this.farmerAssets$.next(this.assets);
    }
}
