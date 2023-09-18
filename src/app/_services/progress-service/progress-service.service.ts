import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProgressServiceService {
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

    private cropInfoCompletedSubject = new BehaviorSubject<boolean>(false);
    cropInfo$: Observable<boolean> =
        this.cropInfoCompletedSubject.asObservable();
    private plotInfoCompletedSubject = new BehaviorSubject<boolean>(false);
    plotInfo$: Observable<boolean> =
        this.cropInfoCompletedSubject.asObservable();
    private personalInfoCompletedSubject = new BehaviorSubject<boolean>(false);
    personalInfo$: Observable<boolean> =
        this.cropInfoCompletedSubject.asObservable();
    private farmInfoCompletedSubject = new BehaviorSubject<boolean>(false);
    farmInfo$: Observable<boolean> =
        this.cropInfoCompletedSubject.asObservable();

    private assetInfoCompletedSubject = new BehaviorSubject<boolean>(false);
    assetInfo$: Observable<boolean> =
        this.cropInfoCompletedSubject.asObservable();

    constructor() {}
    
    // Update the checkbox state
    updateCropInfoCompleted(completed: boolean) {
        this.cropInfoCompletedSubject.next(completed);
    }
    updatePersonalInfoCompleted(completed: boolean) {
        this.personalInfoCompletedSubject.next(completed);
    }
    updateFarmInfoCompleted(completed: boolean) {
        this.farmInfoCompletedSubject.next(completed);
    }
    updateAssetInfoCompleted(completed: boolean) {
        this.assetInfoCompletedSubject.next(completed);
    }

    updatePlotInfoCompleted(completed: boolean) {
        this.plotInfoCompletedSubject.next(completed);
    }
}
