import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FarmerCrop } from 'src/app/_models/farmerCrop';

@Injectable({
    providedIn: 'root',
})
export class CropService {
    private crop: FarmerCrop = {
        id: 0,
        name: '',
        season: '',
        type: '',
        price: 0,
    };

    private cropData$: BehaviorSubject<FarmerCrop> =
        new BehaviorSubject<FarmerCrop>({
            id: 0,
            name: '',
            season: '',
            type: '',
            price: 0,
        });

    constructor(private _portfolioService: PortfolioService) {
        this.setCropData();
    }

    /*---------------------------------
        ALL CROP DATA
    ----------------------------------*/

    // sets the crop data

    setCropData() {
        //: Observable<Crop>
        this._portfolioService.setFarmerPortfolio();
        this._portfolioService
            .getFarmerCropInfo()
            .subscribe((crops: FarmerCrop[]) => {
                // sets the crop object to the first crop object in the crop observable
                this.crop = crops[0];
                this.cropData$.next(this.crop);
            });
        console.table(this.cropData$);
    }

    getCropData(): Observable<FarmerCrop> {
        return this.cropData$;
    }
}
