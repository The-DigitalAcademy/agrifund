import { Injectable } from '@angular/core';
import { Plot } from 'src/app/_models/plot';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PlotService {
  private plots: Plot[] = [];
  createFarmerPlot(plot: Plot) {}
    // stores farmer plots as a behviour subject
    private farmerPlots$ = new BehaviorSubject<Plot[]>([]);
    constructor(private _apiService: ApiService) {}

    // set plot info in observable
    setPlotInfo() {
        // api connecition for getting plot info
        // within api connec assign date to behviour subject for farm info
    }
    // get farm info
    getPlotInfo() {
        // esnures that the farm infor is set when get method is called
        this.setPlotInfo();

        // return the behaviour subject containing the farm info data if it is not blank
        return this.plots;
    }
    // adds crop record from api to observable bookkeeping
    addPlot(plot: Plot) {
        const addedPlot = {
          id: plot.id,
          plotAddress: plot.plotAddress,
          plotSize: plot.plotSize,
          dateOfOwnership: plot.dateOfOwnership
            
        };

        // adds record to records
        this.plots.push(addedPlot);
        // adds record to bookkeeping record observable
        this.farmerPlots$.next(this.plots);
    }
}
