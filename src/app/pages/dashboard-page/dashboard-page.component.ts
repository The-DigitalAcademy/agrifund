import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { BookkeepingService } from 'src/app/_services/bookkeeping-service/bookkeeping.service';
import { ChartService } from 'src/app/_services/chart-service/chart.service';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/_services/user-service/user.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
    // bookkeeping records stored within an observable
    bookkeepingRecords$!: Observable<IncomeStatementItem[]>;
    // used to store subscriptions to services
    private subscription = new Subscription();
    constructor(
        private router: Router,
        private _bookkeepingService: BookkeepingService,
        private _userService: UserService
    ) {

        this._userService.getUserByEmail();

    }

    ngOnInit() {
        // this.subscription.add(this._bookkeepingService.setBookkeepingRecords());
        // gets all bookkeeping values stored in the bookkeeping service observable
        // this.subscription.add(
        //     // gets all values now stored in observable in service
        //     this._bookkeepingService
        //         .getAllBookkeepingRecords()
        //         .subscribe(records => {
        //             this.bookkeepingRecords$ = records;
        //             // console.log(records);
        //         })
        // );
    }
}
