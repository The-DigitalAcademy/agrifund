import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  

  constructor() { }

  private personalInfoCompleted = new BehaviorSubject<boolean>(false);
  private cropInfoCompleted = new BehaviorSubject<boolean>(false);

  personalInfoCompleted$ = this.personalInfoCompleted.asObservable();
  cropInfoCompleted$ = this.cropInfoCompleted.asObservable();

  setPersonalInfoCompleted(status: boolean) {
    this.personalInfoCompleted.next(status);
  }

  setCropInfoCompleted(status: boolean) {
    this.cropInfoCompleted.next(status);
  }
}
