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

    // set farm infor in obaservable
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
                console.table(`Creates this farm data: ${plotBody}`);
            },
            error => {
                console.error('error occured when create new farm data');
                console.error(error);
            }
        );
    }
}
