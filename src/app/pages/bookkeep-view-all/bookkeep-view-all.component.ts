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
export class BookkeepViewAllComponent{
viewRecordDetails(arg0: any) {
throw new Error('Method not implemented.');
}
bookkeepRecords: any;

    constructor( private router: Router){}
  
    counter(i: number) {
        return new Array(i);
    }

    ngOnDestroy() {
        
    }
}

