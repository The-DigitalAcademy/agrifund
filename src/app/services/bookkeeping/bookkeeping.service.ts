/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 25 Aug 2023 

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
import { ApiService } from '../../_services/api-service/api.service';
import { BehaviorSubject, Observable, map, reduce } from 'rxjs';
import { PaginationLoadData } from 'src/app/_models/PaginationLoadData';

@Injectable({
    providedIn: 'root',
})
export class BookkeepingService {
    /*---------------------------------
        OBSERVABLES
    ----------------------------------*/
    // stores all the bookkeeping records
    private records: IncomeStatementItem[] = [];
    // used to store bookkeeping records as observables
    private bookkeepingRecords$ = new BehaviorSubject<IncomeStatementItem[]>(
        []
    );
    // readonly value for bookkeeping records observables to pass data components
    // readonly bookkeepingRecords$ = this._bookkeepingRecords$.asObservable();

    // stores the total bookkeeping records number as a behavior subject
    private _totalBookkeepingRecords$ = new BehaviorSubject<number>(0);
    // readonly value for total bookkeeping records to pass data components
    readonly totalBookkeepingRecords$ =
        this._totalBookkeepingRecords$.asObservable(); //

    // stores the the filtered and searched records
    // private filteredRecords$: BehaviorSubject<IncomeStatementItem>;
    // stores the total income for bookkeeping records (money in)
    // private totalBookkeepingIncome$: BehaviorSubject<number>;
    // stores the total expense for bookkeeping records (money out)
    // private totalBookkeepingExpenses$: BehaviorSubject<number>;

    // create incomeStatement observable
    // create income statements observable

    constructor(private _apiService: ApiService) {}

    /*---------------------------------
        GET & SET DATA
    ----------------------------------*/
    // sets data from the api to the bookkeeping observable
    setBookkeepingRecords() {
        this._apiService.getAllStatementItems().subscribe((data: any) => {
            this.records = data;
            // console.log(this.records);
            this.records.forEach(record => {
                this.addRecord(record);
            });
        });
    }

    // returns all bookkeeping records within the behavior subject
    getAllBookkeepingRecords(): Observable<any> {
        return this.bookkeepingRecords$;
    }

    // get the total number of  bookkeeping records
    getTotalBookkeepingRecords(): Observable<number> {
        // each bookkeeping record is mapped to 1 and summed to the total
        console.table(this.getAllBookkeepingRecords());
        return this.getAllBookkeepingRecords().pipe(
            map(() => 1),
            reduce((total, count) => total + count, 0)
        );
    }

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

    /*---------------------------------
        CREATE/ADD DATA
    ----------------------------------*/
    // generate an id value for a bookkeeping record
    generateRecordId() {
        const id: number = this.records.length;
        return id;
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

    /*---------------------------------
        DELETE DATA
    ----------------------------------*/
    // TODO
    // delete and income statement

    // delete and income statement item
    deleteRecord(recordId: number) {
        console.log(`Before Delete: ${this.records.length}`);
        return this._apiService
            .getStatementItemById(recordId)
            .subscribe((data: any) => {
                console.log(`Before Delete: ${this.records.length}`);
                console.log(data);
                console.log('Successfully deleted record.');
            });
    }

    /*---------------------------------
        SEARCH & FILTER
    ----------------------------------*/
    // TODO
    // set the income statement date

    //TODO
    //get income statement items by date

    // TODO
    // filter by date receives two parameters: startDate and endDate

    // TODO
    // get records by search text

    /*---------------------------------
        CALCULATIONS
    ----------------------------------*/

    // // TODO
    // // update income statement total income
    // calculateTotalIncome() {}

    // // TODO
    // // update income statement total expense
    // calculateTotalExpense() {}

    // // TODO
    // // update income statement total net income (profit)
    // calculateTotalNetIncome() {}
}
