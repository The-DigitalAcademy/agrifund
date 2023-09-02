/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 29 Aug 2023 

    DESCRIPTION:
        This service manages all functions related to income statement record items:
        Manages CRUD operations
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
import { BehaviorSubject, Observable, map, reduce, tap } from 'rxjs';
import { PaginationLoadData } from 'src/app/_models/PaginationLoadData';
import { state } from '@angular/animations';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { UserService } from '../user-service/user.service';
import { IncomeStatement } from './../../_models/IncomeStatement';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { IncomeStatementService } from '../income-statement-service/income-statement.service';

@Injectable({
    providedIn: 'root',
})
export class BookkeepingService {
    /*---------------------------------
        OBSERVABLES
    ----------------------------------*/
    // used to store all initial values fetched from the api
    private statements: IncomeStatement[] = [];
    // will be used to store all income statement items
    private incomeStatements$ = new BehaviorSubject<IncomeStatement[]>([]);
    // stores all the bookkeeping records
    private records: IncomeStatementItem[] = [];
    // used to store bookkeeping records as observables
    private bookkeepingRecords$ = new BehaviorSubject<IncomeStatementItem[]>(
        []
    );
    // stores the total bookkeeping records number as a behavior subject
    private totalBookkeepingRecords$ = new BehaviorSubject<number>(0);
    // stores the the filtered and searched records
    // private filteredRecords$: BehaviorSubject<IncomeStatementItem>;
    // stores the total income for bookkeeping records (money in)
    // private totalBookkeepingIncome$: BehaviorSubject<number>;
    // stores the total expense for bookkeeping records (money out)
    // private totalBookkeepingExpenses$: BehaviorSubject<number>;

    // create incomeStatement observable
    // create income statements observable

    constructor(
        private _apiService: ApiService,
        private router: Router,
        private _portfolioService: PortfolioService,
        private _incomeStatementService: IncomeStatementService
    ) {}
    /*---------------------------------
        GET DATA
    ----------------------------------*/

    // get income statement record item date
    // getIncomeStatementItemDate() {
    //     return this.ico
    // }

    /*---------------------------------
        CREATE/ADD DATA
    ----------------------------------*/
    // create a new bookkeeping record for a specific income statement
    createNewRecord(recordBody: IncomeStatementItem) {
        // checks for the record category to change value to income or expense
        if (recordBody.category === 'Money In') {
            recordBody.category = 'Income';
        } else {
            recordBody.category = 'Expense';
        }

        // adds value from the record body to the new records object that matches how the data is received by the api
        const newRecord = {
            date: recordBody.date,
            category: recordBody.category,
            amount: recordBody.amount,
            description: recordBody.description,
            recordProof: recordBody.proof,
        };

        // get the statement id
        const statementId = this._incomeStatementService.getIncomeStatementId();
        console.log(statementId);

        console.table(newRecord);
        // this._apiService
        //     .addRecord(newRecord, recordBody.statement_id)
        //     .subscribe(
        //         data => {
        //             console.log(data);
        //             // routes back to bookkeeping view all page is the creation of a record was successful
        //             this.router.navigate(['/bookkeeping']);
        //         },
        //         error => {
        //             console.error(`Error occurred while creating a new record`);
        //             console.log(error);
        //         }
        //     );
    }

    // uploads proof of a record to the api
    uploadRecordProof(incomeStatementId: number, recordProof: File) {}

    /*---------------------------------
        SET DATA 
    ----------------------------------*/
    // sets data from the api to the bookkeeping observable
    setBookkeepingRecords() {
        // this._apiService.getAllStatementItems().subscribe(
        //     (data: any) => {
        //         this.records = data;
        //         // each record fetched from the api is added to the bookkeeping record observable
        //         this.records.forEach(record => {
        //             this.addRecord(record);
        //         });
        //     },
        //     error => {
        //         console.error(
        //             `Error occurred while getting bookkeeping records`
        //         );
        //         console.error(error);
        //     }
        // );
    }

    // adds bookkeeping record from api to observable bookkeeping
    addRecord(record: IncomeStatementItem) {
        const addedRecord = {
            id: record.id,
            statement_id: record.statement_id, //income statement id
            category: record.category,
            amount: record.amount,
            proof: record.proof,
            description: record.description,
            date: record.date, //date of the record
        };

        // adds record to records
        this.records.push(addedRecord);
        // adds record to bookkeeping record observable
        this.bookkeepingRecords$.next(this.records);
    }

    /*---------------------------------
        GET DATA 
    ----------------------------------*/
    // returns all bookkeeping records within the behavior subject
    getAllBookkeepingRecords(): Observable<any> {
        this.setBookkeepingRecords();
        return this.bookkeepingRecords$;
    }

    // get the total number of  bookkeeping records
    getTotalBookkeepingRecords(): Observable<number> {
        // let totalRecords = 0;

        // this._apiService.getAllStatementItems().subscribe((data: any) => {
        //     this.records = data;
        //     totalRecords = this.records.length;
        //     this.totalBookkeepingRecords$.next(totalRecords);
        // });

        return this.totalBookkeepingRecords$;
    }

    // gets the current income statement to save the record to
    getIncomeStatement() {
        // TODO: save a record to an income statement based on the date of the record
    }

    // setBookkeepingRecords(record: IncomeStatementItem) {}

    // getBookkeepingRecords() {

    // }

    // TODO
    // create a new bookkeeping record

    // TODO
    // create a income statement

    /*---------------------------------
        UPDATE DATA
    ----------------------------------*/
    // update a bookkeeping record
    updateBookkeepingRecord(record: IncomeStatementItem, recordProof: File) {
        const recordBody = {
            statement_id: record.statement_id,
            category: record.category,
            amount: record.amount,
            description: record.description,
            date: record.date,
        };

        // updates bookkeeping record data
        this._apiService.updateRecord(record.id, recordBody).subscribe(
            data => {
                console.log(data);
            },
            error => {
                error.console(`Error in updating income statement item`, error);
            }
        );

        // uploads bookkeeping record proof
        this._apiService.uploadRecordProof(record.id, recordProof).subscribe(
            data => {
                console.log(data);
            },
            error => {
                error.console(`Error uploading proof for a record`, error);
            }
        );
    }

    /*---------------------------------
        DELETE DATA
    ----------------------------------*/
    // delete and income statement item
    deleteRecord(recordId: number) {
        console.log(`Before Delete: ${this.records.length}`);
        return this._apiService.deleteIncomeStatementItem(recordId).subscribe(
            (data: any) => {
                console.log(data);
            },
            error => {
                error.console(`Error in deleting income statement item`, error);
            }
        );
    }

    /*---------------------------------
        SEARCH & FILTER
    ----------------------------------*/
    // loads bookkeeping data according to pagination
    // public loadBookkeepingRecords(
    //     page: number,
    //     recordsPerPage: number
    // ): Observable<BookkeepingLoadData> {
    //     return this.bookkeepingRecords$.pipe(map(records => ({
    //         metadata: {
    //             itemsPerPage: recordsPerPage,
    //             page: page,
    //             totalItems: 10,
    //         },
    //         data:
    //     })));
    // }

    //TODO
    //get income statement items by date

    // TODO
    // filter by date receives two parameters: startDate and endDate

    // TODO
    // get records by search text

    /*---------------------------------
        CALCULATIONS
    ----------------------------------*/
}
