import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProgressServiceService {
    constructor() {}
    

    private personalInfoCompleted = new BehaviorSubject<boolean>(false);
    private cropInfoCompleted = new BehaviorSubject<boolean>(false);
    private farmInfoCompleted = new BehaviorSubject<boolean>(false);

    personalInfoCompleted$ = this.personalInfoCompleted.asObservable();
    cropInfoCompleted$ = this.cropInfoCompleted.asObservable();
    farmInfoCompleted$ = this.farmInfoCompleted.asObservable(); //

    setPersonalInfoCompleted(status: boolean) {
        this.personalInfoCompleted.next(status);
    }

    setCropInfoCompleted(status: boolean) {
        this.cropInfoCompleted.next(status);
    }
    setFarmInfoCompleted(status: boolean) {
        this.farmInfoCompleted.next(status);
    }
}
