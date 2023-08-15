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
    // calculateTotalIncome(): number {
    //     let total_income = 0;
    //     for (let income of this.income) {
    //         total_incomes += income.amount;
    //     }
    //     return total_income;
    // }

    // TODO
    // update income statement total expense

    // calculateTotalExpense(): number {
    //     let total_expenses = 0;
    //     for (let expense of this.expenses) {
    //         total_expenses += expense.amount;
    //     }
    //     return total_expenses;
    //   }
    // }

    // TODO
    // update income statement total net income (profit)

    // calculateTotalNetIncome() {
    //     calculateTotalRevenue() - this.calculateTotalExpense();

    // }

    // TODO
    // set the income statement date

    //TODO
    //get income statement items by date

    

    //
// }
// get income statement items by date
// fetchIncomeStatement(date: string) {
//     this.bookkepService.getIncomeStatementByDate(date)
//       .subscribe(
//         response => {
//           this.incomeStatement = response; // Store the fetched data
//         },
//         error => {
//           console.error('Error fetching income statement:', error);
//         }
//       );
//   }
}
