import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Asset } from 'src/app/_models/asset';
import { Farm } from 'src/app/_models/Farm';
import { Crop } from 'src/app/_models/crop';
import { Plot } from 'src/app/_models/plot';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../authentication-service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
 
    private farmName: string = '';
    

    // stores the user values as a behavior subject
    farmerUser$ = new BehaviorSubject<any>({});
    _farmService: any;
    router: any;
    _plotService: any;
    _cropService: any;
    _assetService: any;

    constructor(
        private _http: HttpClient,
        private _apiService: ApiService
    ) {
        // this._apiService.getAllEquipment().subscribe((data: any) => {
        //     this.assets = data;
        // });
    } 


    
    setFarmId() {}
    getFarmId(): number {
        const farmId = 1;
        return farmId;
    }

    setFarmName() {}
    getFarmName() { 
        this.setFarmName();
        return this.farmName;
    }
    
}
