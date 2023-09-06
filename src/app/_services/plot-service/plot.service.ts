import { Plot } from 'src/app/_models/plot';



import { Injectable } from '@angular/core';

import { ApiService } from '../api-service/api.service';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { BehaviorSubject } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class PlotService {
    private plots: Plot[] = [];
    // stores farmer plots as a behviour subject
    private farmerPlots$ = new BehaviorSubject<Plot[]>([]);
    constructor(
        private _apiService: ApiService,
        private _portfolioService: PortfolioService
    ) {}

    createFarmerPlot(plotBody: Plot) {
        const farmName = this._portfolioService.getFarmName();
        const addedPlot = {
            plotAddress: plotBody.plotAddress,
            plotSize: plotBody.plotSize,
            dateOfOwnership: plotBody.dateOfOwnership,
        };
        this._apiService.addPlot(farmName, addedPlot).subscribe(
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
        // api connecition for getting plot info
        const farmName = this._portfolioService.getFarmName();
        // within api connec assign date to behviour subject for farm info
        this._apiService.getAllPlots(farmName).subscribe(
            (data: any) => {
                this.plots = data;
                // adds crop to crop data observable
                this.farmerPlots$.next(this.plots);
            },
            error => {
                console.error('Error occured fetching plots data');
                console.error(error);
            }
        );
    }

    // get farm info
    getPlotInfo() {
        // esnures that the farm infor is set when get method is called
        this.setPlotInfo();

        // return the behaviour subject containing the farm info data if it is not blank
        return this.plots;
    }
}
