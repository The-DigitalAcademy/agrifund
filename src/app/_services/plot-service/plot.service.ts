import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plot } from 'src/app/_models/farmerPlot';
import { PortfolioService } from '../portfolio-service/portfolio.service';

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

    constructor(private _portfolioService: PortfolioService) {
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
}
