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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    // subscription for getting incomes statements service
    private incomeStatementRecordSubscription = new Subscription();
    // subscription for income for income statement
    private incomeSubscription = new Subscription();
    // subscription for expense for income statement
    private expenseSubscription = new Subscription();
    // subscription for getting incomes statements service
    private profitSubscription = new Subscription();
    // array for storing income statements
    statements!: IncomeStatement[];
    // observable for storing income statements
    statements$!: Observable<IncomeStatement[]>;
    // stores income statement records
    incomeStatementRecords!: IncomeStatementItem[];
    // bookkeeping records stored within an observable
    records$!: Observable<IncomeStatementItem[]>;
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
    // stores the value of the expense/money out total as an observable
    moneyOutTotal!: number;
    // stores the value of the income/money in total as an observable
    moneyInTotal!: number;
    // stores the value of the net-income/profit total as an observable
    profitTotal!: number;

    constructor(
        private router: Router,
        private _incomeStatementService: IncomeStatementService,
        private _incomeStatementItemService: IncomeStatementItemService,
        private _offcanvasService: NgbOffcanvas,
        private _portfolioService: PortfolioService,
        private fb: FormBuilder
    ) {
        this.dateForm = this.fb.group({
            yearInput: ['', Validators.required],
        });
    }

    ngOnInit() {
        // gets the farmers portfolio information
        this.portfolioSubscription = this._portfolioService
            .getFarmerPortfolio()
            .subscribe(data => {
                // sets the farmer's farm data in order to get income statement data
                this._portfolioService.setFarmerFarm();
            });

        // gets the farmer's income statements
        this.incomeStatementSubscription = this._portfolioService
            .getFarmerIncomeStatements()
            .subscribe((statements: IncomeStatement[]) => {
                // assigns the statements to the statement array
                this.statements = statements;
                // sets the values for the year dropdown list
                this.setIncomeStatementList();
            });

        // sets the selected year value
        const formInput = this.dateForm.value;
        this.selectedYear = formInput.yearInput;

        this.incomeStatementRecordSubscription =
            this._incomeStatementItemService
                .getIncomeStatementItems()
                .subscribe(records => {
                    //records retrieved from behavior subject are assigned to income statement records variable
                    this.incomeStatementRecords = records;
                    /*loops through records and changes values from income and expenses 
                      to money in and money out*/
                    this.incomeStatementRecords.forEach(record => {
                        if (record.category === 'Income') {
                            record.category = 'Money In';
                        } else {
                            record.category = 'Money Out';
                        }
                    });
                });
    }

    ngOnDestroy() {
        // unsubscribe from subscriptions
        this.portfolioSubscription.unsubscribe();
        this.incomeStatementSubscription.unsubscribe();
        this.incomeStatementRecordSubscription.unsubscribe();
        this.expenseSubscription.unsubscribe();
        this.incomeStatementSubscription.unsubscribe();
        this.profitSubscription.unsubscribe();
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

    // method to generate a bookkeeping report for current data
    generateReport() {
        // sets the selected year value
        const formInput = this.dateForm.value;
        this.selectedYear = formInput.yearInput;

        const report = new jsPDF();
        // sets the heading for the report
        report.text(
            `Financial Report for the Financial Year of March ${this.selectedYear}`,
            10,
            10
        );

        // gets the expenses for the year
        this.expenseSubscription = this._incomeStatementService
            .getTotalExpense()
            .subscribe((expenseTotal: number) => {
                // sets the total money out value to the expense total that was returned
                this.moneyOutTotal = expenseTotal;
            });

        // gets the income for the year
        this.incomeSubscription = this._incomeStatementService
            .getTotalIncome()
            .subscribe((incomeTotal: number) => {
                // sets the total money in value to the income total that was returned
                this.moneyInTotal = incomeTotal;
            });

        // gets the profit for the year
        this.profitSubscription = this._incomeStatementService
            .getTotalNetIncome()
            .subscribe((netIncome: number) => {
                // sets the profit value to the net income that was returned
                this.profitTotal = netIncome;
            });

        // creates a table for income statement data summary cards
        autoTable(report, {
            head: [[`Year's Profit`, `Year's Income`, `Year's Expense`]],
            body: [
                [
                    `R ${this.profitTotal}`,
                    `R ${this.moneyInTotal}`,
                    `R ${this.moneyOutTotal}`,
                ],
            ],
        });

        // sets the headers for the report table
        const tableHeaders = ['Record Description', 'Type', 'Date', 'Amount'];
        // sets the data for the pdf report
        const tableData: any = this.incomeStatementRecords.map(record => [
            record.description,
            record.category,
            record.date,
            record.amount,
        ]);

        // creates a table for income statement records
        autoTable(report, {
            head: [tableHeaders],
            body: tableData,
        });

        // downloads the report and saves it with a specified filename
        report.save(`Financial_Report_March_${this.selectedYear}`);
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
