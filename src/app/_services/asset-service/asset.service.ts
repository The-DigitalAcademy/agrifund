import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assets } from 'src/app/_models/Assets';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { ApiService } from '../api-service/api.service';

@Injectable({
    providedIn: 'root',
})
export class AssetService {
    // private asset: Assets = {
    //     assetName: '',
    //     assetType: '',
    //     age: 0,
    //     purchasePrice: 0,
    // };

    // private assetData$: BehaviorSubject<Assets> = new BehaviorSubject<Assets>({
    //     assetName: '',
    //     assetType: '',
    //     age: 0,
    //     purchasePrice: 0,
    // });

    private assets: Assets[] = [];
    // stores farmer plots as a behviour subject
    private assetData$ = new BehaviorSubject<Assets[]>([]);
    constructor(
        private _portfolioService: PortfolioService,
        private _apiService: ApiService
    ) {}

    createFarmerAsset(assetBody: Assets) {
        const farmName = this._portfolioService.getFarmName();
      
        this._apiService.addAsset(farmName, assetBody).subscribe(
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
    setPlotInfo() {
        // api connection  for getting plot info
        const farmName = this._portfolioService.getFarmName();
        // within api connection assign date to behviour subject for farm info
        this._apiService.getAllFarmAssets(farmName).subscribe(
            (data: any) => {
                this.assets = data;
                // adds crop to crop data observable
                this.assetData$.next(this.assets);
            },
            error => {
                console.error('Error occurred fetching plots data');
                console.error(error);
            }
        );
    }

    getAssetData() {
      this.setPlotInfo(); 
        return this.assets;
    }
}
