import { Injectable } from '@angular/core';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class BookkeepService {
    private bookkeepRecords: IncomeStatementItem[] = [];

    constructor(private _apiService: ApiService) {
        this._apiService.getAllStatementItems().subscribe((records: any) => {
            // console.table(products);
            this.bookkeepRecords = records; //populate bookkeep records array with records from api
        });
    }

    generateId() {
        const id: number = this.bookkeepRecords.length;

        return id;
    }

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

    //
}
