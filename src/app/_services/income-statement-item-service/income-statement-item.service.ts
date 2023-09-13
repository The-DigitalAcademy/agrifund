/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 06 Sept 2023 

    DESCRIPTION:
        This service manages all functions related to income statement record items:
        Manages CRUD operations
        Calculates the total bookkeeping incomeStatementItem 
        Filters bookkeeping incomeStatementItem

    PARAMETERS:
        router: Router -> used to rout to other bookkeeping pages
        _apiService - used to subscribe and call methods related to the api connection
        _incomeStatementService: IncomeStatementService -> used to access other income statement service methods
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { IncomeStatementService } from '../income-statement-service/income-statement.service';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { IncomeStatement } from './../../_models/IncomeStatement';
import { Statement } from '@angular/compiler';
@Injectable({
    providedIn: 'root',
})
export class IncomeStatementItemService {
    /*---------------------------------
        OBSERVABLES
    ----------------------------------*/
    // stores current income statement as an array
    // private incomeStatement: IncomeStatement = [];
    // stores current income statement as an observable
    private incomeStatement$ = new BehaviorSubject<IncomeStatement>({
        id: 0,
        farmId: 0,
        statementDate: '',
        totalIncome: 0,
        totalExpenses: 0,
        netIncome: 0,
        incomeStatementItems: [],
    });
    // stores income statement items as an array
    private incomeStatementItem: IncomeStatementItem[] = [];
    // used to store bookkeeping incomeStatementItem as observables
    private incomeStatementItems$ = new BehaviorSubject<IncomeStatementItem[]>(
        []
    );
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
        private _incomeStatementService: IncomeStatementService
    ) {
        // calls method to set the current income statement to us for records
        this.setCurrentIncomeStatement();
    }

    // sets the current income statement to the one set in the income statement service
    setCurrentIncomeStatement() {
        this._incomeStatementService
            .getIncomeStatement()
            .subscribe(incomeStatement => {
                this.incomeStatement$.next(incomeStatement);
            });
    }
    /*---------------------------------
        GET DATA
    ----------------------------------*/
    // used to get income statement record items of an income statement
    getFarmerIncomeStatementItems(): Observable<IncomeStatementItem[]> {
        return this.incomeStatement$.pipe(
            map(statement => statement.incomeStatementItems)
        );
    }

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

    // gets all records that are an expense
    getExpenseRecords() {
        return this.getFarmerIncomeStatementItems().pipe(
            // records are filtered to only return records that are expenses
            map(records =>
                records.filter(record => record.category === 'Expense')
            )
        );
    }

    // gets all records that are an incomes
    getIncomeRecords() {
        return this.getFarmerIncomeStatementItems().pipe(
            // records are filtered to only return records that are incomes
            map(records =>
                records.filter(record => record.category === 'Income')
            )
        );
    }

    // gets the five highest expenses for the current income statement items for the year
    getFiveHighestExpenses() {
        return this.getExpenseRecords().pipe(
            map(records => {
                const sortedList = records.sort((a, b) => b.amount - a.amount);
                return sortedList.slice(0, 5);
            })
        );
    }

    // gets the five highest incomes for the current income statement items for the year
    getFiveHighestIncomes() {
        return this.getIncomeRecords().pipe(
            map(records => {
                const sortedList = records.sort((a, b) => b.amount - a.amount);
                return sortedList.slice(0, 5);
            })
        );
    }

    /*---------------------------------
        CREATE/ADD DATA
    ----------------------------------*/
    // create a new bookkeeping record for a specific income statement
    createNewRecord(recordBody: IncomeStatementItem, recordProof: File) {
        // used to store the records multiform body to pass data adn file
        const recordMultiFormBody = new FormData();
        // checks for the record category to change value to income or expense
        if (recordBody.category === 'Money In') {
            recordBody.category = 'Income';
        } else {
            recordBody.category = 'Expense';
        }
        /* adds value from the record body to the new incomeStatementItem object that 
        matches how the data is received by the api */
        const newRecord = {
            date: recordBody.date,
            category: recordBody.category,
            amount: recordBody.amount,
            description: recordBody.description,
        };

        // adds info to multiform body
        recordMultiFormBody.append('info', JSON.stringify(newRecord));
        // adds file to multiform body
        recordMultiFormBody.append('file', recordProof);

        console.table(recordMultiFormBody);

        this._incomeStatementService
            .getStatementByDate(recordBody.date)
            .subscribe(statement => {
                console.log(statement.id);
                // assigns the id of the statement found to the new bookkeeping record
                recordBody.statementId = statement.id;
            });

        console.log(`Statement ID for record: ${recordBody.statementId}`);

        console.table(newRecord);
        // this._apiService
        //     .addRecord(recordMultiFormBody, recordBody.statementId)
        //     .subscribe(
        //         data => {
        //             console.log(data);
        //             // routes back to bookkeeping view all page is the creation of a record was successful
        //             this.router.navigate(['/bookkeeping']);
        //         },
        //         error => {
        //             console.error(`Error occurred while creating a new record`);
        //             console.error(error);
        //         }
        //     );
    }

    /*---------------------------------
        SET DATA 
    ----------------------------------*/
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

        // adds record to incomeStatementItem
        this.incomeStatementItem.push(addedRecord);
        // adds record to bookkeeping record observable
        this.incomeStatementItems$.next(this.incomeStatementItem);
    }

    /*---------------------------------
        GET DATA 
    ----------------------------------*/
    // returns all bookkeeping incomeStatementItem within the behavior subject
    getAllBookkeepingRecords(): Observable<any> {
        return this.incomeStatementItems$;
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
    //     incomeStatementItemPerPage: number
    // ): Observable<BookkeepingLoadData> {
    //     return this.bookkeepingRecords$.pipe(map(incomeStatementItem => ({
    //         metadata: {
    //             itemsPerPage: incomeStatementItemPerPage,
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
    // get incomeStatementItem by search text

    /*---------------------------------
        CALCULATIONS
    ----------------------------------*/
}
