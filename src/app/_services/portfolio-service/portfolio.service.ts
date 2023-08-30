import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Asset } from 'src/app/_models/asset';
import { Farm } from 'src/app/_models/Farm';
import { Crop } from 'src/app/_models/crop';
import { Plot } from 'src/app/_models/plot';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    private assets: Asset[] = [];
    constructor(
        private _http: HttpClient,
        private _apiService: ApiService
    ) {
        // this._apiService.getAllEquipment().subscribe((data: any) => {
        //     this.assets = data;
        // });
    }
    // stores the farmer user's farm date
    private farms: Farm[] = [];
    private crops: Crop[] = [];
    private plots: Plot[] = [];

    // creates data for a farmers farm and sends to api
    createFarmerFarmInfo(farmBody: Farm) {
        this._apiService.addFarmInfo(farmBody).subscribe(
            result => {
                console.table(`Creates this farm data: ${farmBody}`);
            },
            error => {
                console.error('error occured when create new farm data');
                console.error(error);
            }
        );
    }

    // set farm info in observable
    setFarmInfo() {
        // api connecition for getting farmer info
        // within api connec tin assign date to behviour subject for farm info
    }

    // get farm info
    getFarmInfo() {
        // esnures that the farm infor is set when get method is called
        this.setFarmInfo();

        // return the behaviour subject containing the farm info data if it is not blank
        return this.farms;
    }
    createFarmerPlotInfo(plotBody: Plot) {
        this._apiService.addPlotInfo(plotBody).subscribe(
            result => {
                console.table(`Creates this plot data: ${plotBody}`);
            },
            error => {
                console.error('error occured when create new plot data');
                console.error(error);
            }
        );
    }
    setPlotInfo() {
        // api connecition for getting plot info
        // within api connection assign data to behaviour subject for plot info
    }
    // get plot info
    getPlotInfo() {
        // esnures that the plot info is set when get method is called
        this.setPlotInfo();

        // return the behaviour subject containing the plot info data if it is not blank
        return this.plots;
    }
    createFarmerCropInfo(cropBody: Crop) {
        this._apiService.addCropInfo(cropBody).subscribe(
            result => {
                console.table(`Creates this crop data: ${cropBody}`);
            },
            error => {
                console.error('error occured when create new crop data');
                console.error(error);
            }
        );
    }
    setCropInfo() {
        // api connecition for getting crop info
        // within api connection assign data to behaviour subject for crop info
    }
    // get plot info
    getCropInfo() {
        // esnures that the crop info is set when get method is called
        this.setCropInfo();

        // return the behaviour subject containing the crop info data if it is not blank
        return this.crops;
    }

    createFarmerAssetInfo(assetBody: Asset) {
        this._apiService.addAssetInfo(assetBody).subscribe(
            result => {
                console.table(`Creates this asset data: ${assetBody}`);
            },
            error => {
                console.error('error occured when create new asset data');
                console.error(error);
            }
        );
    }
    setAssetInfo() {
        // api connecition for getting asset info
        // within api connection assign data to behaviour subject for asset info
    }
    // get plot info
    getAssetInfo() {
        // esnures that the crop info is set when get method is called
        this.setAssetInfo();

        // return the behaviour subject containing the crop info data if it is not blank
        return this.assets;
    }
}
