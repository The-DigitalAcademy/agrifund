import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IncomeStatement } from 'src/app/models/IncomeStatement';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepService } from 'src/app/services/bookkeep/bookkeep.service';

@Component({
    selector: 'app-bookkeep-view-all',
    templateUrl: './bookkeep-view-all.component.html',
    styleUrls: ['./bookkeep-view-all.component.css'],
})
export class BookkeepViewAllComponent implements OnInit, OnDestroy {
    bookkeepRecords: IncomeStatementItem[] = [];
    bookkeepRecords$: Observable<IncomeStatementItem[]> | undefined;
    // stores the total number of bookkeeping records
    totalBookkeepRecords$: Observable<number> | undefined;

    private subscription = new Subscription();

    constructor(
        private router: Router,
        private _apiService: ApiService,
        private _bookkeepService: BookkeepService
    ) {
        this._apiService.getAllStatementItems().subscribe((records: any) => {
            // console.table(products);
            this.bookkeepRecords$ = records; //populate bookkeepRecords array with records from api
            // console.log(this.bookkeepRecords);
        });
    }

    viewRecordDetails(recordId: any) {
        // console.log(recordId);
        this.router.navigate(['bookkeep/view-record', recordId]);
    }

    ngOnInit() {
        this._apiService.getAllStatementItems().subscribe((records: any) => {
            // console.table(products);
            this.bookkeepRecords = records; //populate bookkeepRecords array with records from api
            // console.log(this.bookkeepRecords);
        });

        // adds get all records to subscription
        this.subscription.add(
            this._bookkeepService
                .getAllBookkeepRecords()
                .subscribe((records: any) => {
                    this.bookkeepRecords$ = records;
                    // console.log(this.bookkeepRecords$);
                })
        );

        // gets the total bookkeep records
        // this.totalBookkeepRecords$ =
        //     this._bookkeepService.getTotalBookkeepRecords();
        // console.log(this.totalBookkeepRecords$);
    }

    ngOnDestroy() {
        // unsubscribe from bookkeep subscription
        this.subscription.unsubscribe();
    }
}
