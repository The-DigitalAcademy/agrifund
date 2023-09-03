/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 20 July 2023 
    UPDATED DATE: 31 Aug 2023 

    DESCRIPTION:
        This component displays all bookkeeping data and provides navigation to 
        bookkeeping create and view details functions
    PARAMETERS:
        private router: Router -> used to route to other bookkeeping functions
        private _bookkeepingService: BookkeepingService -> used for bookkeeping income statement methods
        private _offcanvasService: NgbOffcanvas -> the ngBootstrap service for the offcanvas menu
        private _portfolioService: PortfolioService -> used to access portfolio service methods
        
-------------------------------------------------------------------------------------------------*/

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { IncomeStatementItemService } from 'src/app/_services/income-statement-item-service/income-statement-item.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';

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
        private _incomeStatementItemService: IncomeStatementItemService,
        private _offcanvasService: NgbOffcanvas,
        private _portfolioService: PortfolioService
    ) {}

    ngOnInit() {
        // sets the bookkeeping records
        this.subscription.add(
            //populate sets the bookkeeping records value in the bookkeeping service
            this._incomeStatementItemService.setBookkeepingRecords()
        );

        // gets all bookkeeping values stored in the bookkeeping service observable
        this.subscription.add(
            // gets all values now stored in observable in service
            this._incomeStatementItemService
                .getAllBookkeepingRecords()
                .subscribe(records => {
                    this.bookkeepingRecords$ = records;
                })
        );

        // gets the farmer's income statements
        this.subscription.add(
            this._portfolioService
                .getFarmerIncomeStatements()
                .subscribe(data => {
                    console.log(data);
                })
        );
    }
    ngOnDestroy() {
        // unsubscribe from bookkeeping subscription
        this.subscription.unsubscribe();
    }

    // when a record is clicked it will route to the view all page for singular viewing
    viewRecordDetails(recordId: number) {
        this.router.navigate(['/bookkeeping/view-record', recordId]);
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
}
