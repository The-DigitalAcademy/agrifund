/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 29 Aug 2023 

    DESCRIPTION:
       This component displays a farmer's portfolio data summary
    PARAMETERS:
    _portfolioService: PortfolioService -> used to get farmer portfolio data
        
-------------------------------------------------------------------------------------------------*/

import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { IncomeStatement } from 'src/app/_models/IncomeStatement';
import { IncomeStatementService } from 'src/app/_services/income-statement-service/income-statement.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
    // subscription for portfolio service
    private portfolioSubscription = new Subscription();
    // subscription for getting incomes statements service
    private incomeStatementSubscription = new Subscription();
    // array for storing income statements
    statements!: IncomeStatement[];
    // form for date filter
    dateForm: FormGroup;
    // sets the default value for dropdown
    defaultYear = 0;
    // stores the selected value of the dropdown list
    selectedYear = '';
    // stores the list of year for income statements
    statementList: string[] = [];
    // stores the value of the total expenses/money out for an income statement of the year as observable
    totalExpense$!: Observable<number>;
    // stores the value of the total income/money in for an income statement of the year as observable
    totalIncome$!: Observable<number>;

    constructor(
        private _portfolioService: PortfolioService,
        private _incomeStatementService: IncomeStatementService,
        private fb: FormBuilder
    ) {
        this.dateForm = this.fb.group({
            yearInput: ['', Validators.required],
        });
    }

    ngOnInit() {
        this._portfolioService.setFarmerPortfolio();
        // gets the farmers portfolio information
        this.portfolioSubscription = this._portfolioService
            .getFarmerPortfolio()
            .subscribe(data => {
                // sets the farmer's farm data in order to get income statement data
                this._portfolioService.setFarmerFarm();
                // sets the farmer's income statement list after teh income statements have been set
                this.setIncomeStatementList();
            });

        this.incomeStatementSubscription = this._portfolioService
            .getFarmerIncomeStatements()
            .subscribe(statements => {
                // assigns the statement from the farmer income statements service to the statements variable
                this.statements = statements;
            });

        // sets the selected year value
        const formInput = this.dateForm.value;
        this.selectedYear = formInput.yearInput;
        // sets the current
        this._incomeStatementService.getIncomeStatementForYear(
            Number(this.selectedYear)
        );
    }

    ngOnDestroy() {
        // unsubscribe from subscriptions
        this.portfolioSubscription.unsubscribe();
        this.incomeStatementSubscription.unsubscribe();
    }

    // function to set the values for the income statement dropdown
    setIncomeStatementList() {
        if (this.statements) {
            // sets the farmer's income statement list
            this._incomeStatementService.setIncomeStatementYearList();
            // gets the farmer income statement list and sets it to the statement list
            this.statementList =
                this._incomeStatementService.getIncomeStatementYearList();
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
}
