import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Asset } from 'src/app/_models/asset';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    private assets: Asset[] = [];
    user$ = new BehaviorSubject<any>({});
    constructor(
        private _http: HttpClient,
        private _apiService: ApiService
    ) {
        // this._apiService.getAllEquipment().subscribe((data: any) => {
        //     this.assets = data;
        // });
    }

    generateId() {
        const id: number = this.assets.length;

        return id;
    }
    generateFarmId() {
        const farm_id: number = this.assets.length;
        return farm_id;
    }

    getPersonalDetails() {
        this._http.get('YOUR_API_ENDPOINT').subscribe(
            (result: any) => {
                console.log('API Response:', result);
                this.user$.next(result);
            },
            error => {
                console.error(
                    `Error occurred while getting user data, ${error}`
                );
            }
        );
    }
}



