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
import { IncomeStatement } from '../../_models/IncomeStatement';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { IncomeStatementService } from '../income-statement-service/income-statement.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
    providedIn: 'root',
})
export class IncomeStatementItemService {
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
    // stores the income statement fetched from the api
    private record: IncomeStatementItem = {
        id: 0,
        statementId: 0,
        date: '',
        category: '',
        amount: 0,
        description: '',
        proofOfReceipt: '',
    };

    // stores a single income statement record item's value -> initializes as empty
    private incomeStatementItem$: BehaviorSubject<IncomeStatementItem> =
        new BehaviorSubject<IncomeStatementItem>({
            id: 0,
            statementId: 0, //IncomeStatement;
            category: '',
            amount: 0,
            proofOfReceipt: '',
            description: '',
            date: '', //date of the record
        });

    constructor(
        private _apiService: ApiService,
        private router: Router,
        private _portfolioService: PortfolioService,
        private _incomeStatementService: IncomeStatementService,
    ) {}
    /*---------------------------------
        GET DATA
    ----------------------------------*/

    // get a single income statement record
    getIncomeStatementRecordById(
        recordId: number
    ): Observable<IncomeStatementItem> {
        this._apiService
            .getStatementItemById(recordId)
            .subscribe((response: any) => {
                this.record = response.data;
                console.table(this.record);
                // adds the record to the income statement item observable
                this.incomeStatementItem$.next(this.record);
                console.table(this.incomeStatementItem$);
            });
        return this.incomeStatementItem$;
    }

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
        };

        // sets the statement id to and passes date value to method
        recordBody.statementId =
            this._incomeStatementService.getIncomeStatementIdForCreate(
                recordBody.date
            );

        console.log(`Statement ID for record: ${recordBody.statementId}`);

        console.table(newRecord);
        this._apiService.addRecord(newRecord, recordBody.statementId).subscribe(
            data => {
                console.log(data);
                // routes back to bookkeeping view all page is the creation of a record was successful
                this.router.navigate(['/bookkeeping']);
            },
            error => {
                console.error(`Error occurred while creating a new record`);
                console.error(error);
            }
        );
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
            statementId: record.statementId, //income statement id
            date: record.date, //date of the record
            category: record.category,
            amount: record.amount,
            proofOfReceipt: record.proofOfReceipt,
            description: record.description,
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

    /*---------------------------------
        UPDATE DATA
    ----------------------------------*/
    // update a bookkeeping record
    updateBookkeepingRecord(record: IncomeStatementItem, recordProof: File) {
        const recordBody = {
            category: record.category,
            amount: record.amount,
            description: record.description,
            date: record.date,
        };

        record.statementId = 1;
        // updates bookkeeping record data
        this._apiService
            .updateRecord(record.id, record.statementId, recordBody)
            .subscribe(
                data => {
                    // routes back to bookkeeping record details with the record id
                    this.router.navigate([
                        'bookkeeping/view-record',
                        record.id,
                    ]);
                },
                error => {
                    console.error(
                        `Error in updating income statement item`,
                        error
                    );
                }
            );

        // uploads bookkeeping record proof
        // this._apiService.uploadRecordProof(record.id, recordProof).subscribe(
        //     data => {
        //         console.log(data);
        //     },
        //     error => {
        //         error.console(`Error uploading proof for a record`, error);
        //     }
        // );
    }

    /*---------------------------------
        DELETE DATA
    ----------------------------------*/
    // delete and income statement item
    deleteRecord(recordId: number) {
        // let activeModal: NgbActiveModal;
        const statementId = 1;
        return this._apiService
            .deleteIncomeStatementItem(recordId, statementId)
            .subscribe(
                (data: any) => {
                    console.log(data);
                    // closes the bookkeeping delete modal
                    // activeModal.close();
                    // routes back to bookkeeping view all
                    this.router.navigate(['/bookkeeping']);
                },
                error => {
                    console.error(
                        `Error in deleting income statement item`,
                        error
                    );
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