import { Farm } from 'src/app/_models/FarmerPortfolio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class MockService {
    constructor(private http: HttpClient) {}

    private BASe_URL = environment.MOCK_URL;

    /* --------------------------------
       ABOUT THE FARM CONNECTION
    ---------------------------------*/
    private FARM_URL = this.BASe_URL + '/farms';
    private CROP_URL = this.BASe_URL + '/crops';
    private PLOT_URL = this.BASe_URL + '/plots';
    private ASSET_URL = this.BASe_URL + '/assets';

    /* --------------------------------
        ABOUT THE FARM REQUESTS
    ---------------------------------*/

    // POST function for registering a new farmer user
    cropInfo(body: any) {
        return this.http.post(`${this.CROP_URL}`, body);
    }

    getCropInfo() {
        return this.http.get(`${this.CROP_URL}`);
    }

    plotInfo(body: any) {
        return this.http.post(`${this.PLOT_URL}`, body);
    }

    getPlotInfo() {
        return this.http.get(`${this.PLOT_URL}`);
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
        return this.http.get(`${this.ASSET_URL}`);
    }
}
