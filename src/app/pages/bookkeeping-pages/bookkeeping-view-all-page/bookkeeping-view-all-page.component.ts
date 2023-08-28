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
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { BookkeepingService } from 'src/app/_services/bookkeeping-service/bookkeeping.service';

@Component({
    selector: 'app-bookkeeping-view-all-page',
    templateUrl: './bookkeeping-view-all-page.component.html',
    styleUrls: ['./bookkeeping-view-all-page.component.css'],
})
export class BookkeepingViewAllPageComponent implements OnInit, OnDestroy {
    // bookkeeping records stored within an observable
    bookkeepingRecords$!: Observable<IncomeStatementItem[]>;
    // stores the total bookkeeping records
    totalBookkeepingRecords$!: number;
    // bookkeeping records stored within an observable
    filteredRecords$!: Observable<IncomeStatementItem[]>;
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
    ) {}

    viewRecordDetails(recordId: number) {
        this.router.navigate(['/bookkeeping/view-record', recordId]);
    }

    ngOnInit() {
        // sets the bookkeeping records
        this.subscription.add(
            //populate sets the bookkeeping records value in the bookkeeping service
            this._bookkeepingService.setBookkeepingRecords()
        );

        // gets all bookkeeping values stored in the bookkeeping service observable
        this.subscription.add(
            // gets all values now stored in observable in service
            this._bookkeepingService
                .getAllBookkeepingRecords()
                .subscribe(records => {
                    this.bookkeepingRecords$ = records;
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

    // toggles the offcanvas mobile search bar
    openMobileSearchbar() {
        this._offcanvasService.open(this.mobileSearchBar, {
            position: 'top',
            backdrop: false,
        });
    }

    // closes offcanvas search bar
    closeSearchbar() {
        this._offcanvasService.dismiss();
    }

    ngOnDestroy() {
        // unsubscribe from bookkeeping subscription
        this.subscription.unsubscribe();
    }
}
