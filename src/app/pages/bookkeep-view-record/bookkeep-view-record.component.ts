import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeStatement } from 'src/app/models/income-statement';
import { IncomeStatementItem } from 'src/app/models/income-statement-item';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepService } from 'src/app/services/bookkeep/bookkeep.service';

@Component({
    selector: 'app-bookkeep-view-record',
    templateUrl: './bookkeep-view-record.component.html',
    styleUrls: ['./bookkeep-view-record.component.css'],
})
export class BookkeepViewRecordComponent implements OnInit {
    id!: any;
    record!: IncomeStatementItem;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _bookkeepService: BookkeepService,
        private _apiService: ApiService
    ) {}

    ngOnInit() {
        this.getRecordDetails((this.id = this.route.snapshot.params['id']));
    }

    getRecordDetails(id: any) {
        this._apiService
            .getStatementItemById(this.id)
            .subscribe((data: any) => {
                this.record = data;
            });
    }

    viewProof(documentUrl: string) {


    }
}
