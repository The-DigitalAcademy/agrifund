import { Injectable } from '@angular/core';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, Subscriber, count } from 'rxjs';

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
    // used to store bookkeepinging records as observables
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

    // adds a new bookkeeping record to the api
    // addNewRecord(newRecord: IncomeStatementItem) { 

    //     this._apiService
    //     // adds record to the observable array
        
    // }

    // setBookkeepingRecords(record: IncomeStatementItem) {}

    // getBookkeepingRecords() {

    // }

    // TODO
    // create a new bookkeepinging record

    // TODO
    // create a income statement

    /*---------------------------------
        GET DATA
    ----------------------------------*/
    // returns all bookkeepinging records within the behavior subject
    getAllBookkeepingRecords(): Observable<IncomeStatementItem> {
        return this.bookkeepingRecords$;
    }

    // TODO
    // get a bookkeeping record by id

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

    // TODO
    // update income statement total income
    calculateTotalIncome() {}

    // TODO
    // update income statement total expense
    calculateTotalExpense() {}

    // TODO
    // update income statement total net income (profit)
    calculateTotalNetIncome() {}

    // calcualtes the total bookkeepinging records within the observables records
    // getTotalBookkeepingRecords(): Observable<number> {
    //     return new Observable<number>(subscriber => {
    //         let count = 0;
    //         this.bookkeepingRecords$.subscribe({
    //             next: () => count++,
    //             complete: () => {
    //                 subscriber.next(count);
    //                 subscriber.complete();
    //             },
    //         });
    //     });
    // }
}
