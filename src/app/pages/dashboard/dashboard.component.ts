import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { BookkeepingService } from 'src/app/services/bookkeeping/bookkeeping.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    // bookkeeping records stored within an observable
    bookkeepingRecords$!: Observable<IncomeStatementItem[]>;
    // used to store subscriptions to services
    private subscription = new Subscription();
    constructor(
        private router: Router,
        private _bookkeepingService: BookkeepingService
    ) {}

    ngOnInit() {
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
    }
}
