import { FarmerPortfolio } from 'src/app/_models/FarmerPortfolio';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Crop } from 'src/app/_models/Crop';
import { ApiService } from '../api-service/api.service';


@Injectable({
    providedIn: 'root',
})
export class CropService {
    private crop: Crop = {
      id: 0,
      name: '',
      season: '',
      type: ''
    };

    private cropData$: BehaviorSubject<Crop> = new BehaviorSubject<Crop>({
        id: 0,
        name: '',
        season: '',
        type: '',
    });

    constructor(private _portfolioService: PortfolioService) {
        this.setCropData();
    }

    /*---------------------------------
        ALL CROP DATA
    ----------------------------------*/

    // sets the crop data

    setCropData(){
        //: Observable<Crop>
        this._portfolioService.setFarmerPortfolio();
        this._portfolioService.getFarmerCropInfo().subscribe((crops: Crop[]) => {
          // sets the crop object to the first crop object in the crop observable
          this.crop = crops[0]
          this.cropData$.next(this.crop);
        
        });
        console.table(this.cropData$);
    }

    getCropData(): Observable<Crop> {
        return this.cropData$;
    }
}
