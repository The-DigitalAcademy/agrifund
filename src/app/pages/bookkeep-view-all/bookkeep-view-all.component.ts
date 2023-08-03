import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncomeStatement } from 'src/app/models/income-statement';
import { IncomeStatementItem } from 'src/app/models/income-statement-item';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-bookkeep-view-all',
    templateUrl: './bookkeep-view-all.component.html',
    styleUrls: ['./bookkeep-view-all.component.css'],
})
export class BookkeepViewAllComponent implements OnInit, OnDestroy {
    bookkeepRecords: IncomeStatementItem[] = [];

    constructor(
        private router: Router,
        private _apiService: ApiService
    ) {}

    viewRecordDetails(recordId: number) {
        // console.log(recordId);
        this.router.navigate(['bookkeep/view-record', recordId]);
    }

    ngOnInit() {
        this._apiService.getAllStatementItems().subscribe((records: any) => {
            // console.table(products);
            this.bookkeepRecords = records; //populate bookkeepRecords array with records from api
            console.log(this.bookkeepRecords);
        });
    }

    ngOnDestroy() {
        
    }
}
