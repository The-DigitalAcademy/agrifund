import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plot } from 'src/app/_models/plot';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { ApiService } from '../api-service/api.service';

@Injectable({
    providedIn: 'root',
})
export class PlotService {
    private plot: Plot = {
        id: 0,
        plotAddress: '',
        plotSize: '',
        dateOfOwnership: '',
    };

    private plotData$: BehaviorSubject<Plot> = new BehaviorSubject<Plot>({
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
            .subscribe((plots: Plot[]) => {
                // sets the crop object to the first crop object in the crop observable
                this.plot = plots[0];
                this.plotData$.next(this.plot);
            });
        console.table(this.plotData$);
    }

    getPlotData(): Observable<Plot> {
        return this.plotData$;
    }

    editPlot(plot: Plot) {
        const updatedPlot = {
            id: plot.id,
            plotAddress: plot.plotAddress,
            plotSize: plot.plotSize,
            dateOfOwnership: plot.dateOfOwnership,
        };

        // api connection goes here
        this._apiService.updatePlot(plot.id, updatedPlot).subscribe(
            data => {
                console.log('Plot data updated successfully:', data);
            },
            error => {
                console.error('Error updating plot:', error);
            }
        );
    }
}
