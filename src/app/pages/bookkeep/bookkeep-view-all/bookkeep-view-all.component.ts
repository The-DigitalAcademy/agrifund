import {
    Component,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
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
    // bookkeping records stored within an observable
    bookkeepRecords$: Observable<IncomeStatementItem[]> | undefined;
    // stores the total number of bookkeeping records
    totalBookkeepRecords$: Observable<number> | undefined;
    // used to store subscriptions to services
    private subscription = new Subscription();
    // stores the value within the search bar
    searchValue = '';
    // refers to the offcanvas html element
    @ViewChild('mobileSearchbar', { static: true })
    private mobileSearchBar!: NgbOffcanvas;

    constructor(
        private router: Router,
        private _apiService: ApiService,
        private _bookkeepService: BookkeepService,
        private _offcanvasService: NgbOffcanvas
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
    }

    openMobileSearchbar(content: TemplateRef<any>) {
        this._offcanvasService.open(this.mobileSearchBar, {
            position: 'top',
            backdrop: false,
        });
    }

    closeSearchbar() {
        this._offcanvasService.dismiss();
    }

    ngOnDestroy() {
        // unsubscribe from bookkeep subscription
        this.subscription.unsubscribe();
    }
}
