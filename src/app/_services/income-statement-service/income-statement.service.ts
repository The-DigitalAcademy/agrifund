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
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject, Observable, map, reduce } from 'rxjs';
import { PaginationLoadData } from 'src/app/_models/PaginationLoadData';
import { state } from '@angular/animations';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from '../user-service/user.service';
import { IncomeStatement } from '../../_models/IncomeStatement';

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

    constructor(
        private _apiService: ApiService,
        private _userService: UserService,
        private router: Router
    ) {}

    /*---------------------------------
        CREATE DATA
    ----------------------------------*/
    // creates a new income statement item
    createIncomeStatement() {}

    // checks if an income statement has been created for current financial year
    incomeStatementExist() {}

    /*---------------------------------
        SET DATA
    ----------------------------------*/
    // populates the income statements observable
    setAllIncomeStatements(farmName: string) {
        this._apiService.getAllIncomeStatementsByFarm(farmName).subscribe(
            (data: any) => {
                // assigns the data retrieved from the api to the statements array
                this.statements = data;
                console.table(`Statements Retrieved: ${this.statements}`);
            },
            error => {
                console.error(
                    `Error occurred while getting bookkeeping records`
                );
                console.error(error);
            }
        );
    }
    // selects a singular income statement to use
    setIncomeStatement() {
        // if the income statement exists for the current year
        // new income statement date is created
    }

    // sets the date for an income statement
    setIncomeStatementDate() {
        // gets the current date
        const today: Date = new Date();
        // gets the current year
        const currentYear = today.getFullYear();
        // South African financial year starts on the 1st of march
        const financialYearStartMonth = 2; //month of the March -> index starts at 0
        // sets the date value as string value

        // sets the default financial year
        let financialYearStart = new Date(
            currentYear,
            financialYearStartMonth,
            1
        );

        // checks if the current data is less than the financial start year
        if (today < financialYearStart) {
            // sets the financial data a the previous year, the month of March
            financialYearStart = new Date(
                currentYear - 1,
                financialYearStartMonth,
                1
            );
        }

        return financialYearStart;
    }

    /*---------------------------------
        GET DATA
    ----------------------------------*/
    // gets all the income statements from the api
    getAllIncomeStatements(): Observable<IncomeStatement[]> {
        // passes the farm name to the one assigned in user service
        this.setAllIncomeStatements(this._userService.getFarmName());

        return this.incomeStatements$;
    }

    // used to get a single income statement by it's id
    getSingleIncomeStatement(statmentId: number) {}

    // TODO
    // update income statement total income
    calculateTotalIncome() {}

    // TODO
    // update income statement total expense
    calculateTotalExpense() {}

    // update income statement total net income (profit)
    calculateTotalNetIncome() {}
}
