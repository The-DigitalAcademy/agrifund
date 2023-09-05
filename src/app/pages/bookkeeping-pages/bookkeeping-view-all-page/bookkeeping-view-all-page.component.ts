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
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { IncomeStatement } from 'src/app/_models/IncomeStatement';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { IncomeStatementItemService } from 'src/app/_services/income-statement-item-service/income-statement-item.service';
import { IncomeStatementService } from 'src/app/_services/income-statement-service/income-statement.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';

@Component({
    selector: 'app-bookkeeping-view-all-page',
    templateUrl: './bookkeeping-view-all-page.component.html',
    styleUrls: ['./bookkeeping-view-all-page.component.css'],
})
export class BookkeepingViewAllPageComponent implements OnInit, OnDestroy {
    // subscription for portfolio service
    private portfolioSubscription = new Subscription();
    // subscription for getting incomes statements service
    private incomeStatementSubscription = new Subscription();
    // array for storing income statements
    statements!: IncomeStatement[];
    // observable for storing income statements
    statements$!: Observable<IncomeStatement[]>;
    // stores income statement records
    incomeStatementRecords!: IncomeStatementItem[];
    // bookkeeping records stored within an observable
    filteredRecords$!: Observable<IncomeStatementItem[]>;
    // form for date filter
    dateForm: FormGroup;
    // sets the default value for dropdown
    defaultYear = 0;
    // stores the selected value of the dropdown list
    selectedYear = '';
    // stores the value within the search bar
    searchValue = '';
    // refers to the offcanvas html element
    @ViewChild('mobileSearchbar', { static: true })
    private mobileSearchBar!: NgbOffcanvas;
    // stores the list of year for income statements
    statementList: string[] = [];

    constructor(
        private router: Router,
        private _incomeStatementService: IncomeStatementService,
        private _offcanvasService: NgbOffcanvas,
        private _portfolioService: PortfolioService,
        private fb: FormBuilder
    ) {
        this.dateForm = this.fb.group({
            yearInput: ['', Validators.required],
        });
    }

    ngOnInit() {
        // gets the farmer's income statements
        this.incomeStatementSubscription = this._portfolioService
            .getFarmerIncomeStatements()
            .subscribe((data: IncomeStatement[]) => {
                // assigns the statements to the statement array
                this.statements = data;
                // sets the values for the year dropdown list
                this.setIncomeStatementList();
            });

        // sets the selected year value
        const formInput = this.dateForm.value;
        this.selectedYear = formInput.yearInput;
        // gets income statement items for year
        this._incomeStatementService
            .getIncomeStatementItemsForYear(Number(this.selectedYear))
            .subscribe(incomeStatementItems => {
                this.incomeStatementRecords = incomeStatementItems;
                console.table(this.incomeStatementRecords);
            });
    }

    ngOnDestroy() {
        // unsubscribe from subscriptions
        this.portfolioSubscription.unsubscribe();
        this.incomeStatementSubscription.unsubscribe();
    }

    // function to set the values for the income statement dropdown
    setIncomeStatementList() {
        if (this.statements) {
            this.statements.forEach(statement => {
                const statementYear =
                    this._incomeStatementService.getStatementYear(
                        statement.statementDate
                    );
                // sets the default year to the most recent date
                if (statementYear > this.defaultYear) {
                    this.defaultYear = statementYear;
                }
                // only adds a new year if it doesn't already exist in the list
                if (!this.statementList.includes(`${statementYear}`)) {
                    this.statementList.push(`${statementYear}`);
                }
            });
            // sets the dropdown value to the default year
            this.dateForm = this.fb.group({
                yearInput: new FormControl(this.defaultYear),
            });
        }
    }

    // when the dropdown value for the year is changed
    onYearChange(event: any) {
        const formInput = this.dateForm.value;
        this.selectedYear = formInput.yearInput;
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
