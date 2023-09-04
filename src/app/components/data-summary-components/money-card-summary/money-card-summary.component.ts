/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel 
    CREATE DATE: 07 Aug 2023 
    UPDATED DATE: 04 September 2023    

    DESCRIPTION:
        Within this component the total money in, money out and total profit is calculated and 
        displayed based on the date inputs received from bookkeeping view all or dashboard.

    PARAMETERS:
        totalMoneyIn -> used to store the total money in value
        totalMoneyOut -> used to store the total money out value
        total profit -> used to store the total profit value

    
-------------------------------------------------------------------------------------------------*/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { IncomeStatement } from 'src/app/_models/IncomeStatement';
import { IncomeStatementService } from 'src/app/_services/income-statement-service/income-statement.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';

@Component({
    selector: 'app-money-card-summary',
    templateUrl: './money-card-summary.component.html',
    styleUrls: ['./money-card-summary.component.css'],
})
export class MoneyCardSummaryComponent implements OnInit, OnDestroy {
    // subscription for portfolio service
    private portfolioSubscription = new Subscription();
    // subscription for getting incomes statements service
    private incomeStatementSubscription = new Subscription();
    // subscription for income for income statement
    private incomeSubscription = new Subscription();
    // subscription for expense for income statement
    private expenseSubscription = new Subscription();
    // subscription for getting incomes statements service
    private profitSubscription = new Subscription();

    // stores the value of the expense/money out total as an observable
    moneyOutTotal$!: number;
    // stores the value of the income/money in total as an observable
    moneyInTotal$!: number;
    // stores the value of the net-income/profit total as an observable
    profitTotal$!: number;

    constructor(
        private _incomeStatementService: IncomeStatementService,
        private _portfolioService: PortfolioService
    ) {}

    ngOnInit() {
        // gets the farmer's income statements
        this.incomeStatementSubscription = this._portfolioService
            .getFarmerIncomeStatements()
            .subscribe((data: IncomeStatement[]) => {
                // assigns the statements to the statement array
            });

        // gets income statement for the year
        this.incomeStatementSubscription = this._incomeStatementService
            .getIncomeStatementForYear(2023)
            .subscribe((incomeStatement: IncomeStatement) => {
                console.table(incomeStatement);
            });

        // gets the expenses for the year
        this.expenseSubscription = this._incomeStatementService
            .getTotalExpense()
            .subscribe((expenseTotal: number) => {
                // sets the total money out value to the expense total that was returned
                this.moneyOutTotal$ = expenseTotal;
            });

        // gets the income for the year
        this.incomeSubscription = this._incomeStatementService
            .getTotalIncome()
            .subscribe((incomeTotal: number) => {
                // sets the total money in value to the income total that was returned
                this.moneyInTotal$ = incomeTotal;
            });

        // gets the profit for the year
        this.profitSubscription = this._incomeStatementService
            .getTotalNetIncome()
            .subscribe((netIncome: number) => {
                // sets the profit value to the net income that was returned
                this.profitTotal$ = netIncome;
            });
    }

    ngOnDestroy() {
        // unsubscribe from subscriptions
        this.portfolioSubscription.unsubscribe();
        this.incomeStatementSubscription.unsubscribe();
        this.expenseSubscription.unsubscribe();
        this.incomeStatementSubscription.unsubscribe();
        this.profitSubscription.unsubscribe();
    }
}
