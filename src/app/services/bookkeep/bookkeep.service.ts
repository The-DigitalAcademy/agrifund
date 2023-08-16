import { Injectable } from '@angular/core';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from '../api/api.service';

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
    private bookkeepRecords: IncomeStatementItem[] = [];
    //TODO
    // create a bookkeep record observable
    // create bookkeep records observable
    // create incomeStatment observable
    // create income statements observable

    constructor(private _apiService: ApiService) {
        this._apiService.getAllStatementItems().subscribe((data: any) => {
            // console.table(products);
            //populate bookkeep records array with records from api
            this.bookkeepRecords = data;
        });
    }

    /*---------------------------------
        CREATE DATA
    ----------------------------------*/
    // generate a value for a bookkeeping record
    generateRecordId() {
        const id: number = this.bookkeepRecords.length;
        return id;
    }

    // TODO
    // create a new bookkeeping record

    // TODO
    // create a income statement

    /*---------------------------------
        GET DATA
    ----------------------------------*/
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
