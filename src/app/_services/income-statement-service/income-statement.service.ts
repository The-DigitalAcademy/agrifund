/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 05 Sept 2023 

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
import { BehaviorSubject, Observable, map } from 'rxjs';
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
            farmId: 0,
            statementDate: '',
            totalIncome: 0,
            totalExpenses: 0,
            netIncome: 0,
            incomeStatementItems: [],
        });
    // stores the list of years for income statements as a string for dropdown
    private statementYearList: string[] = [];

    constructor(
        private _apiService: ApiService,
        private _portfolioService: PortfolioService
    ) {
        // sets the portfolio
        this._portfolioService.setFarmerPortfolio();
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
            });
    }

    // sets a current income statement
    setIncomeStatement(statement: IncomeStatement) {
        // assigns the statement to the statement observable
        this.incomeStatement$.next(statement);
    }

    /*---------------------------------
        GET DATA
    ----------------------------------*/
    // gets all the income statements retrieved from the portfolio
    getAllIncomeStatements(): Observable<IncomeStatement[]> {
        this.setAllIncomeStatements();
        return this.incomeStatements$;
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
                            currentStatement.statementDate
                        );

                        // checks that a statement falls within the data specified
                        if (
                            currentStatementDate <= date &&
                            date <=
                                this.getFinancialYearEnd(currentStatementDate)
                        ) {
                            //returns the income statement has the same year as the record
                            return currentStatement;
                        }

                        // returns the last income statement that was true
                        return lastTrueStatement;
                    }
                );
            }
        });
        // if an income statement exists
        if (statement) {
            // assigns the statement to the statement observable
            this.setIncomeStatement(statement);
            this.incomeStatement$.next(statement);
        }
        // returns a statement for the date
        return statement;
    }

    // gets the date of an income statement
    getStatementYear(statementDate: string) {
        // coverts date in string to date value
        const date = this.convertStringToDate(statementDate);
        // gets the full year from the date value
        const year = date.getFullYear();
        return year;
    }

    // used to get a single income statement by it's id
    getIncomeStatement(): Observable<IncomeStatement> {
        return this.incomeStatement$;
    }

    // gets the total income for an income statement for money in
    getTotalIncome() {
        return this.incomeStatement$.pipe(
            map(statement => statement.totalIncome)
        );
    }

    // get the total expenses for an income statement for money out
    getTotalExpense() {
        return this.incomeStatement$.pipe(
            map(statement => statement.totalExpenses)
        );
    }

    // get the total net income for an income statement for profit value
    getTotalNetIncome() {
        return this.incomeStatement$.pipe(
            map(statement => statement.netIncome)
        );
    }

    // used to get the income statement id for an income statement id
    getIncomeStatementId(): Observable<number> {
        return this.incomeStatement$.pipe(map(statement => statement.id));
    }

    // get income statement for a specific year
    getIncomeStatementForYear(year: number) {
        this.getAllIncomeStatements().subscribe(statements => {
            // checks that the statement is not empty
            if (statements.length > 0) {
                // sets the statement to the first statement that matches the year
                const statement = statements.find(statement => {
                    const currentStatementDate = this.convertStringToDate(
                        statement.statementDate
                    );
                    const currentStatementYear =
                        currentStatementDate.getFullYear();
                    // returns the first statement that satisfies the condition
                    return currentStatementYear <= year;
                });
                if (statement) {
                    // assigns the statement to the statement observable
                    this.incomeStatement$.next(statement);
                }
            }
        });
        // returns a statement for the date
        return this.incomeStatement$;
    }

    // function to set and return a list of income statement year values
    setIncomeStatementYearList() {
        // sets the default value for the current year
        let currentYear = 0;
        // stored

        if (this.statements) {
            this.statements.forEach(statement => {
                const statementYear = this.getStatementYear(
                    statement.statementDate
                );
                // sets the current year to the most recent date
                if (statementYear > currentYear) {
                    currentYear = statementYear;
                }
                // only adds a new year if it doesn't already exist in the list
                if (!this.statementYearList.includes(`${statementYear}`)) {
                    this.statementYearList.push(`${statementYear}`);
                }
            });
        }
    }

    // returns the income statement year list
    getIncomeStatementYearList() {
        return this.statementYearList;
    }

    /*---------------------------------
        CREATING A STATEMENT
    ----------------------------------*/
    // returns an income statement id based on the created record's date
    getIncomeStatementIdForCreate(recordDate: string): number {
        // set variable that will be used to pass the statement id
        let statementId = 0;
        // converts the record date to a data value type
        const recordDateValue: Date = this.convertStringToDate(recordDate);

        // checks if an income statement exist for the financial year of the record
        if (this.statementExistsForFinancialYear(recordDateValue)) {
            // the statement observable will be set to statement for the added record's financial year
            const statement = this.getStatementByDate(recordDateValue);
            if (statement != null) {
                statementId = statement.id;
                console.log(statementId);
                // sets the income statement to the one an item is being added to
                this.setIncomeStatement(statement);
            }
        } else {
            // if a statement doesn't exist for the financial year a new one will be created
            this.createIncomeStatement(recordDateValue);
            // the statement observable will be set to statement for the added record's financial year
            const statement = this.getStatementByDate(recordDateValue);
            console.log(
                `Newly created statement for financial year chosen: ${statement}`
            );
        }

        // call the method in this service to get the income statement id of income statement observable
        this.getIncomeStatementId().subscribe(incomeStatementId => {
            // assigns the income statement id retrieved from the set income statement
            statementId = incomeStatementId;
        });
        return statementId;
    }

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

    // creates a new income statement item
    createIncomeStatement(date: Date) {
        // sets the farmName to pass to creating a new income statement item
        const farmName = this._portfolioService.getFarmName();
        // assigns the statement date and converts it into a string
        const statementDate = this.convertDateToString(
            this.getIncomeStatementDate(date)
        );

        // sets the statement body to pass to create a new income statement
        const statementBody = {
            statementDate: statementDate,
            totalIncome: 0,
            totalExpenses: 0,
            netIncome: 0,
        };

        console.table(statementBody);

        // request to api to create new income statement
        this._apiService
            .createIncomeStatement(farmName, statementBody)
            .subscribe(
                (data: any) => {
                    this.setAllIncomeStatements();
                    // gets the newly created income statement by its date
                    this.getStatementByDate(date);
                },
                error => {
                    console.error(
                        `Error occurred while getting bookkeeping records`
                    );
                    console.error(error);
                }
            );
    }

    // sets the date for an income statement and returns it based on the record data passed to it
    getIncomeStatementDate(date: Date) {
        // gets the current date
        const recordDate: Date = date;
        // gets the current year
        const recordYear = recordDate.getFullYear();
        // South African financial year starts on the 1st of march
        const financialYearStartMonth = 2; //month of the March -> index starts at 0

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

    // gets the financial year end date based on the financial year start date
    getFinancialYearEnd(financialStartDate: Date): Date {
        // gets the year from the current financial year start date
        const financialYear = financialStartDate.getFullYear();
        // sets the financial end year to the next years date
        const nextYear = financialYear + 1;
        // stores value wether the year is a leap year or not
        let isYearLeap = false;

        // checks whether the next year is leap year
        if (
            nextYear % 4 === 0 &&
            (nextYear % 100 !== 0 || nextYear % 400 === 0)
        ) {
            isYearLeap = true;
        }

        // passes the last date of february based on whether it is leap year or not
        const dayOfMonth = isYearLeap ? 29 : 28;

        // checks if the financial end year is a leap year

        // returns the financial year end date as the next year the last day February
        return new Date(financialYear + 1, 1, dayOfMonth);
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
        CALCULATIONS
    ----------------------------------*/
}
