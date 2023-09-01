import { Farm } from 'src/app/_models/FarmerPortfolio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class MockService {
    constructor(private http: HttpClient) {}

    private BASE_URL = environment.MOCK_URL;

    /* --------------------------------
       ABOUT THE FARM CONNECTION
    ---------------------------------*/
    private FARM_URL = this.BASE_URL + '/farms';
    private CROP_URL = this.BASE_URL + '/crops';
    private PLOT_URL = this.BASE_URL + '/plots';
    private ASSET_URL = this.BASE_URL + '/assets';

    /* --------------------------------
        ABOUT THE FARM REQUESTS
    ---------------------------------*/

    // POST function for registering a new farmer user
    cropInfo(body: any) {
        return this.http.post(`${this.CROP_URL}`, body);
    }

    getCropInfo() {
        return this.http.get(`${this.FARM_URL}`);
    }

    plotInfo(body: any) {
        return this.http.post(`${this.PLOT_URL}`, body);
    }

    getPlotInfo() {
        return this.http.get(`${this.FARM_URL}`);
    }

    farmInfo(body: any) {
        return this.http.post(`${this.FARM_URL}`, body);
    }

    getFarmInfo() {
        return this.http.get(`${this.FARM_URL}`);
    }

    assetInfo(body: any) {
        return this.http.post(`${this.ASSET_URL}`, body);
    }

    getAssetInfo() {
        return this.http.get(`${this.FARM_URL}`);
    }
}
