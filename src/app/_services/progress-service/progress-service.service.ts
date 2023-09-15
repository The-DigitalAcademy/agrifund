import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProgressServiceService {
    constructor() {}

    private personalInfoCompleted = new BehaviorSubject<number>(0);
    private cropInfoCompleted = new BehaviorSubject<number>(0);
    private farmInfoCompleted = new BehaviorSubject<number>(0);
    private assetInfoCompleted = new BehaviorSubject<number>(0);
    private plotInfoCompleted = new BehaviorSubject<number>(0);

    personalInfoCompleted$ = this.personalInfoCompleted.asObservable();
    cropInfoCompleted$ = this.cropInfoCompleted.asObservable();
    farmInfoCompleted$ = this.farmInfoCompleted.asObservable();
    assetInfoCompleted$ = this.assetInfoCompleted.asObservable();
    plotInfoCompleted$ = this.plotInfoCompleted.asObservable();

    setPersonalInfoCompleted(progress: number) {
        this.personalInfoCompleted.next(progress);
    }

    setCropInfoCompleted(progress: number) {
        this.cropInfoCompleted.next(progress);
    }
    setFarmInfoCompleted(progress: number) {
        this.farmInfoCompleted.next(progress);
    }
    setAssetInfoCompleted(progress: number) {
        this.assetInfoCompleted.next(progress);
    }
    setPlotInfoCompleted(progress: number) {
        this.plotInfoCompleted.next(progress);
    }
}
