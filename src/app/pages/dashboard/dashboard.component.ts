import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { BookkeepingService } from 'src/app/services/bookkeeping/bookkeeping.service';
import { ChartService } from 'src/app/services/chart/chart.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    // stores the total number of bookkeeping records
    totalBookkeepingRecords$!: number;
    // bookkeeping records stored within an observable
    bookkeepingRecords$!: Observable<IncomeStatementItem[]>;
    // used to store subscriptions to services
    private subscription = new Subscription();
    constructor(
        private router: Router,
        private _bookkeepingService: BookkeepingService
    ) {}

    ngOnInit() {
        // this.subscription.add(this._bookkeepingService.setBookkeepingRecords());
        // gets all bookkeeping values stored in the bookkeeping service observable
        this.subscription.add(
            // gets all values now stored in observable in service
            this._bookkeepingService
                .getAllBookkeepingRecords()
                .subscribe(records => {
                    this.bookkeepingRecords$ = records;
                    // console.log(records);
                })
        );

        this.subscription.add(
            this._bookkeepingService
                .getTotalBookkeepingRecords()
                .subscribe(total => {
                    this.totalBookkeepingRecords$ = total;
                    console.log(this.totalBookkeepingRecords$);
                })
        );
    }

    ngOnDestroy() {
        // unsubscribe from bookkeeping subscription
        this.subscription.unsubscribe();
    }
}
