import { Injectable } from '@angular/core';
import { Plot } from 'src/app/_models/plot';
import { ApiService } from '../api-service/api.service';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { BehaviorSubject } from 'rxjs';
import { Farm } from 'src/app/_models/Farm';

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

    // createFarmerPlot(farmName: string, plotBody: Plot) {
    //     this._apiService.addPlot(farmName,plotBody).subscribe(
    //         result => {
    //             console.table(`Creates this farm data: ${farmName}`);
    //         },
    //         error => {
    //             console.error('error occured when create new farm data');
    //             console.error(error);
    //         }
    //     );
    // }
 
    createFarmerPlot(plotBody: Plot) {
        const farmName = this._portfolioService.getFarmName();
        const addedPlot = {
            plotAddress : plotBody.plotAddress,
            plotSize :plotBody.plotSize,
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
