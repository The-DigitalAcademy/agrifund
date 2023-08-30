import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Asset } from 'src/app/_models/asset';
import { ApiService } from '../api-service/api.service';

@Injectable({
    providedIn: 'root',
})
export class AssetService {
    private assets: Asset[] = [];

    private farmerAssets$ = new BehaviorSubject<Asset[]>([]);
    constructor(private _apiService: ApiService) {}
    createFarmerAsset(asset: Asset) {}
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
    addAsset(asset: Asset) {
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
