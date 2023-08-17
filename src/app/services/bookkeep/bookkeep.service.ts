import { Injectable } from '@angular/core';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from '../api/api.service';
import { BehaviorSubject } from 'rxjs';

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
            // console.table(products);
            //populate bookkeep records array with records from api
            this.bookkeepRecords = data;
        });

        // creates a default bookkeeping record behaviour subject
        this.bookkeepRecords$ = new BehaviorSubject<IncomeStatementItem>({
            id: this.generateRecordId(),
            statement_id: 0, //income statment id
            category: '',
            amount: 0,
            proof: '',
            description: '',
            date: '', //date of the record
        });
    }

    /*---------------------------------
        CREATE DATA
    ----------------------------------*/
    // generate a bookkeeping record value for a bookkeeping record
    generateRecordId() {
        const id: number = this.bookkeepRecords.length;
        return id;
    }

    // adds a new bookkeeping record
    setBookkeepRecords(record: IncomeStatementItem) {}

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
    getBookkeepRecords() {
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
    // update income statement total income
    calculateTotalIncome() {}

    // TODO
    // update income statement total expense
    calculateTotalExpense() {}

    // TODO
    // update income statement total net income (profit)
    calculateTotalNetIncome() {}

    // TODO
    // set the income statement date

    //TODO
    //get income statement items by date

    // TODO
    // filter by date receives two parameters: startDate and endDate

    // TODO
    // get records by search text
}
