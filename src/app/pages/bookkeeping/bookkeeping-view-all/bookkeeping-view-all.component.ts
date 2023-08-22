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
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepingService } from 'src/app/services/bookkeeping/bookkeeping.service';

@Component({
    selector: 'app-bookkeeping-view-all',
    templateUrl: './bookkeeping-view-all.component.html',
    styleUrls: ['./bookkeeping-view-all.component.css'],
})
export class BookkeepingViewAllComponent implements OnInit, OnDestroy {
    bookkeepingRecords: IncomeStatementItem[] = [];
    // bookkeeping records stored within an observable
    bookkeepingRecords$: Observable<IncomeStatementItem[]> | undefined;
    // stores the total number of bookkeeping records
    totalBookkeepingRecords$: Observable<number> | undefined;
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
        private _bookkeepingService: BookkeepingService,
        private _offcanvasService: NgbOffcanvas
    ) {
        this._apiService.getAllStatementItems().subscribe((records: any) => {
            // console.table(products);
            this.bookkeepingRecords$ = records; //populate bookkeepingRecords array with records from api
            // console.log(this.bookkeepingRecords);
        });
    }

    viewRecordDetails(recordId: any) {
        // console.log(recordId);
        this.router.navigate(['bookkeeping/view-record', recordId]);
    }

    ngOnInit() {
        this._apiService.getAllStatementItems().subscribe((records: any) => {
            // console.table(products);
            this.bookkeepingRecords = records; //populate bookkeepingRecords array with records from api
            // console.log(this.bookkeepingRecords);
        });

        // adds get all records to subscription
        this.subscription.add(
            this._bookkeepingService
                .getAllBookkeepingRecords()
                .subscribe((records: any) => {
                    this.bookkeepingRecords$ = records;
                    // console.log(this.bookkeepingRecords$);
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
        // unsubscribe from bookkeeping subscription
        this.subscription.unsubscribe();
    }
}
