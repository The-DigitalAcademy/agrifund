/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 29 Aug 2023 

    DESCRIPTION:
        This service manages all functions related to bookkeeping:
        Manages bookkeeping CRUD operations
        Calculates the total bookkeeping records 
        Filters bookkeeping records

    PARAMETERS:
        _apiService - used to subscribe and call methods related to the api connection
        _bookkeepingService -> used to subscribe and call methods within the bookkeeping service
        $bookkeepingRecord -> stores the bookkeeping record as an observable.
        editRecordForm -> name of the form group used for the reactive form
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject, Observable, last, map } from 'rxjs';
import { IncomeStatement } from '../../_models/IncomeStatement';
import { PortfolioService } from '../portfolio-service/portfolio.service';

@Injectable({
    providedIn: 'root',
})
export class IncomeStatementService {
    /*---------------------------------
        OBSERVABLES
    ----------------------------------*/
    // used to store all initial values fetched from the api
    private statements: IncomeStatement[] = [];
    // will be used to store all income statement items
    private incomeStatements$ = new BehaviorSubject<IncomeStatement[]>([]);
    // stores a single income statement's value -> initializes as empty
    private incomeStatement$: BehaviorSubject<IncomeStatement> =
        new BehaviorSubject<IncomeStatement>({
            id: 0,
            farm_id: 0,
            statement_date: '',
            total_income: 0,
            total_expenses: 0,
            net_income: 0,
            incomeStatementItems: [],
        });

    constructor(
        private _apiService: ApiService,
        private _portfolioService: PortfolioService
    ) {
        // makes it so that all
        this.setAllIncomeStatements();
    }

    /*---------------------------------
        SET DATA
    ----------------------------------*/
    // populates the income statements observable
    setAllIncomeStatements() {
        // gets all the income statements from the portfolio service
        this._portfolioService
            .getFarmerIncomeStatements()
            .subscribe(statements => {
                // sets statements value to the statements retrieved from the portfolio service
                this.statements = statements;
                // adds statements to income statements observable
                this.incomeStatements$.next(this.statements);
                console.log(`Income Statements stored in observable: `);
                console.table(this.incomeStatements$);
            });
    }

    // selects a singular income statement to use
    setIncomeStatement(date: Date) {
        // sets the income statement observable the one matching the given date
        // this.incomeStatements$ = this.incomeStatements$.pipe(map(statements => statement )
    }

    /*---------------------------------
        GET DATA
    ----------------------------------*/
    // gets all the income statements retrieved from the portfolio
    getAllIncomeStatements(): Observable<IncomeStatement[]> {
        return this.incomeStatements$;
    }

    // returns an income statement id based on the created record's date
    getIncomeStatementIdForCreate(recordDate: string): number {
        // set variable that will be used to pass the statement id
        let statementId = 0;

        // converts the record date to a data value type
        const recordDateValue: Date = this.convertStringToDate(recordDate);

        // checks if an income statement exist for the financial year of the record
        if (this.statementExistsForFinancialYear(recordDateValue)) {
            // the statement observable will be set to statement for the added record's financial year
        } else {
            // if a statement doesn't exist for the financial year a new one will be created
            this.createIncomeStatement(recordDateValue);
        }

        // call the method in this service to get the income statement id of income statement observable
        this.getIncomeStatementId().subscribe(incomeStatementId => {
            // assigns the income statement id retrieved from the set income statement
            statementId = incomeStatementId;
            console.log(`This is the set statement Id: ${statementId}`);
        });

        // console.log(statementId);

        return statementId;
    }

    // get an incomeStatement by date
    getStatementByDate(date: Date): IncomeStatement | null {
        let statement = null;

        this.getAllIncomeStatements().subscribe(statements => {
            // checks that the statement is not empty
            if (statements.length > 0) {
                statement = statements.reduce(
                    (lastTrueStatement, currentStatement) => {
                        // converts the income statement date to the date datatype
                        const currentStatementDate = this.convertStringToDate(
                            currentStatement.statement_date
                        );

                        if (
                            currentStatementDate <= date ||
                            currentStatementDate === date
                        ) {
                            //returns the last income statement that is less than the current data
                            return currentStatement;
                        }

                        return lastTrueStatement;
                    }
                );
            }
        });

        // returns a statement for the date
        return statement;
    }

    // used to get a single income statement by it's id
    getIncomeStatement() {
        return this.incomeStatement$;
    }

    // gets the total income for an income statement for money in
    getTotalIncome() {
        return this.incomeStatement$.pipe(
            map(statement => statement.total_income)
        );
    }

    // get the total expenses for an income statement for money out
    getTotalExpense() {
        return this.incomeStatement$.pipe(
            map(statement => statement.total_expenses)
        );
    }

    // get the total net income for an income statement for profit value
    getTotalNetIncome() {
        return this.incomeStatement$.pipe(
            map(statement => statement.net_income)
        );
    }

    // used to get the income statement id for an income statement id
    getIncomeStatementId(): Observable<number> {
        return this.incomeStatement$.pipe(map(statement => statement.id));
    }

    // sets the date for an income statement and returns it based on the record data passed to it
    getIncomeStatementDate(date: Date) {
        // gets the current date
        const recordDate: Date = date;
        // gets the current year
        const recordYear = recordDate.getFullYear();
        // South African financial year starts on the 1st of march
        const financialYearStartMonth = 2; //month of the March -> index starts at 0
        // sets the date value as string value

        // sets the default financial year for the current year
        let financialYearStart = new Date(
            recordYear,
            financialYearStartMonth,
            1
        );

        // checks if the current data is less than the financial start year
        if (recordDate < financialYearStart) {
            // sets the financial date to the previous year, the month of March
            financialYearStart = new Date(
                recordYear - 1,
                financialYearStartMonth,
                1
            );
        }

        return financialYearStart;
    }

    /*---------------------------------
        CREATE DATA
    ----------------------------------*/
    // creates a new income statement item
    createIncomeStatement(date: Date) {
        // sets the farmName to pass to creating a new income statement item
        const farmName = this._portfolioService.getFarmName();
        console.log(
            `Farm Name when creating a new income statement: ${farmName}`
        );
        // assigns the statement date and converts it into a string
        const statementDate = this.convertDateToString(
            this.getIncomeStatementDate(date)
        );
        console.log(
            `Statement date for new income statement: ${statementDate}`
        );

        const statementBody = {
            statement_date: statementDate,
            total_income: 0,
            total_expenses: 0,
            net_income: 0,
        };

        console.log('Statement created');
        console.table(statementBody);
        // call api function to create new income statement
        // this._apiService
        //     .createIncomeStatement(farmName, statementBody)
        //     .subscribe(
        //         (data: any) => {
        //             // assigns the data retrieved from the api to the statements array
        //             console.log(
        //                 `Return after creating a new income statement: ${data}`
        //             );
        //         },
        //         error => {
        //             console.error(
        //                 `Error occurred while getting bookkeeping records`
        //             );
        //             console.error(error);
        //         }
        //     );
    }

    /*---------------------------------
        CONVERT DATA
    ----------------------------------*/
    // used to convert the string date values into the date format
    convertStringToDate(stringDate: string) {
        return new Date(stringDate);
    }

    // used to convert the date values into the string format
    convertDateToString(date: Date) {
        // breaks date up into sections
        const d = new Date(date),
            year = d.getFullYear();
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        // returns the date as a string with dashes in between
        return [year, month, day].join('-');
    }

    /*---------------------------------
        CHECK DATA
    ----------------------------------*/
    // checks if an income statement has been created for a financial year
    statementExistsForFinancialYear(recordDate: Date) {
        // checks to see if a statement exists for a financial year
        this.getAllIncomeStatements();

        if (this.getStatementByDate(recordDate) != null) {
            // returns true if the statement exists
            return true;
        } else {
            // returns false if the statement does not exist
            return false;
        }
    }

    /*---------------------------------
        CALCULATIONS
    ----------------------------------*/
}
