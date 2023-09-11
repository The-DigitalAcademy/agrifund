import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { FarmerPlot } from 'src/app/_models/farmerPlot';

@Injectable({
    providedIn: 'root',
})
export class PlotService {
    private plot: FarmerPlot = {
        id: 0,
        plotAddress: '',
        plotSize: '',
        dateOfOwnership: '',
    };

    private plotData$: BehaviorSubject<FarmerPlot> =
        new BehaviorSubject<FarmerPlot>({
            id: 0,
            plotAddress: '',
            plotSize: '',
            dateOfOwnership: '',
        });

    constructor(
        private _portfolioService: PortfolioService,
        private _apiService: ApiService
    ) {
        this.setPlotData();
    }

    setPlotData() {
        //: Observable<Crop>
        this._portfolioService.setFarmerPortfolio();
        this._portfolioService
            .getFarmerPlotInfo()
            .subscribe((plots: FarmerPlot[]) => {
                // sets the crop object to the first crop object in the crop observable
                this.plot = plots[0];
                this.plotData$.next(this.plot);
            });
        console.table(this.plotData$);
    }

    getPlotData(): Observable<FarmerPlot> {
        return this.plotData$;
    }
    private plots: FarmerPlot[] = [];
    // stores farmer plots as a behviour subject
    private farmerPlots$ = new BehaviorSubject<FarmerPlot[]>([]);

    createFarmerPlot(plotBody: FarmerPlot) {
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
}
