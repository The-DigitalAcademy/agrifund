import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProgressService {
    constructor() {}

    // BehaviorSubject instances to track completion status
    private personalInfoCompleted = new BehaviorSubject<boolean>(false);
    private cropInfoCompleted = new BehaviorSubject<boolean>(false);
    private farmInfoCompleted = new BehaviorSubject<boolean>(false);

    // Observable streams for subscribers
    personalInfoCompleted$ = this.personalInfoCompleted.asObservable();
    cropInfoCompleted$ = this.cropInfoCompleted.asObservable();
    farmInfoCompleted$ = this.farmInfoCompleted.asObservable();

    // Methods to set completion status and notify subscribers
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
