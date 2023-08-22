import { Injectable } from '@angular/core';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, count, map, reduce } from 'rxjs';
import { BookkeepingLoadData } from 'src/app/models/interfaces/bookkeeping-load-data';

@Injectable({
    providedIn: 'root',
})
export class BookkeepingService {
    /*---------------------------------
        API CONNECTION
    ----------------------------------*/
    /*---------------------------------
        OBSERVABLES
    ----------------------------------*/
    // stores all the bookkeeping records
    private bookkeepingRecords: IncomeStatementItem[] = [];
    // used to store bookkeeping records as observables
    private bookkeepingRecords$: BehaviorSubject<IncomeStatementItem>;
    // stores the the filtered and searched records
    // private filteredRecords$: BehaviorSubject<IncomeStatementItem>;

    // stores the total income for bookkeeping records (money in)
    // private totalBookkeepingIncome$: BehaviorSubject<number>;
    // stores the total expense for bookkeeping records (money out)
    // private totalBookkeepingExpenses$: BehaviorSubject<number>;

    // create incomeStatement observable
    // create income statements observable

    constructor(private _apiService: ApiService) {
        this._apiService.getAllStatementItems().subscribe((data: any) => {
            //populate bookkeeping records array with records from api
            this.bookkeepingRecords = data;
            this.bookkeepingRecords.forEach(record => {
                // adds bookkeeping records to the observable array
                this.addRecord(record);
            });
        });

        // creates a default bookkeeping record behavior subject
        this.bookkeepingRecords$ = new BehaviorSubject<IncomeStatementItem>({
            id: 0,
            statement_id: 0, //income statement id
            category: '',
            amount: 0,
            proof: '',
            description: '',
            date: '', //date of the record
        });
    }

    /*---------------------------------
        CREATE/ADD DATA
    ----------------------------------*/
    // generate a bookkeepinging record value for a bookkeepinging record
    generateRecordId() {
        const id: number = this.bookkeepingRecords.length;
        return id;
    }

    // adds bookkeepinging record from api to observable bookkeeping
    addRecord(record: IncomeStatementItem) {
        const addedRecord = {
            id: record.id,
            statement_id: record.statement_id, //income statment id
            category: record.category,
            amount: record.amount,
            proof: record.proof,
            description: record.description,
            date: record.date, //date of the record
        };

        // adds record to bookkeeping record observable
        this.bookkeepingRecords$.next(addedRecord);
    }

    // setBookkeepingRecords(record: IncomeStatementItem) {}

    // getBookkeepingRecords() {

    // }

    // TODO
    // create a new bookkeeping record

    // TODO
    // create a income statement

    /*---------------------------------
        GET DATA
    ----------------------------------*/
    // returns all bookkeeping records within the behavior subject
    getAllBookkeepingRecords(): Observable<IncomeStatementItem> {
        return this.bookkeepingRecords$;
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
        UPDATE DATA
    ----------------------------------*/

    /*---------------------------------
        DELETE DATA
    ----------------------------------*/
    // TODO
    // delete and income statement

    // delete and income statement item
    deleteRecord(recordId: number) {
        console.log(`Before Delete: ${this.bookkeepingRecords.length}`);
        return this._apiService
            .getStatementItemById(recordId)
            .subscribe((data: any) => {
                console.log(`Before Delete: ${this.bookkeepingRecords.length}`);
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
    // calculate the total number of bookkeeping records
    totalBookkeepingRecords() {
        // each bookkeeping record is mapped to 1 and summed to the total
        return this.bookkeepingRecords$.pipe(
            map(() => 1),
            reduce((total, count) => total + count, 0)
        );
    }

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
