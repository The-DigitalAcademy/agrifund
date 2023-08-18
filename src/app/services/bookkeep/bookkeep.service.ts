import { Injectable } from '@angular/core';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, Subscriber, count } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BookkeepService {
    /*---------------------------------
        API CONNECTION
    ----------------------------------*/
    /*---------------------------------
        OBSERVABLES
    ----------------------------------*/
    // stores all the bookkeep records
    private bookkeepRecords: IncomeStatementItem[] = [];
    // used to store bookkeeping records as observables
    private bookkeepRecords$: BehaviorSubject<IncomeStatementItem>;
    // stores the the filtered and searched records
    // private fileterdRecords$: BehaviorSubject<IncomeStatementItem>;

    //TODO
    // create bookkeep records observable
    // create incomeStatment observable
    // create income statements observable

    constructor(private _apiService: ApiService) {
        this._apiService.getAllStatementItems().subscribe((data: any) => {
            //populate bookkeep records array with records from api
            this.bookkeepRecords = data;
            this.bookkeepRecords.forEach(record => {
                // adds bookkeeping records to the observable array
                this.addRecord(record);
            });
        });

        // creates a default bookkeeping record behaviour subject
        this.bookkeepRecords$ = new BehaviorSubject<IncomeStatementItem>({
            id: 0,
            statement_id: 0, //income statment id
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
    // generate a bookkeeping record value for a bookkeeping record
    generateRecordId() {
        const id: number = this.bookkeepRecords.length;
        return id;
    }

    // adds bookkeeping record from api to observable bookkeep
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

        this.bookkeepRecords$.next(addedRecord);
    }

    // setBookkeepRecords(record: IncomeStatementItem) {}

    // getBookkeepRecords() {

    // }

    // TODO
    // create a new bookkeeping record

    // TODO
    // create a income statement

    /*---------------------------------
        GET DATA
    ----------------------------------*/
    // returns all bookkeping records within the behavior subject
    getAllBookkeepRecords(): Observable<any> {
        return this.bookkeepRecords$;
    }

    // TODO
    // get a bookkeep record by id

    // TODO
    // get an income statement by id

    /*---------------------------------
        UPDATE DATA
    ----------------------------------*/

    /*---------------------------------
        DELETE DATA
    ----------------------------------*/
    // TODO
    // delete and income statement

    // TODO
    // delete and income statement item
    deleteRecord(recordId: number) {
        console.log(`Before Delete: ${this.bookkeepRecords.length}`);
        return this._apiService
            .getStatementItemById(recordId)
            .subscribe((data: any) => {
                console.log(`Before Delete: ${this.bookkeepRecords.length}`);
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

    // TODO
    // update income statement total income
    calculateTotalIncome() {}

    // TODO
    // update income statement total expense
    calculateTotalExpense() {}

    // TODO
    // update income statement total net income (profit)
    calculateTotalNetIncome() {}

    // calcualtes the total bookkeeping records within the observables records
    // getTotalBookkeepRecords(): Observable<number> {
    //     return new Observable<number>(subscriber => {
    //         let count = 0;
    //         this.bookkeepRecords$.subscribe({
    //             next: () => count++,
    //             complete: () => {
    //                 subscriber.next(count);
    //                 subscriber.complete();
    //             },
    //         });
    //     });
    // }
}
