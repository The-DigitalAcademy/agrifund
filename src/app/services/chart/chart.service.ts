import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ChartService {

  income:any
  expense:any
  constructor(private http: HttpClient) { }

  Getchartinfo() {
    return this.http.get("http://localhost:3000/expense");
    }

    // update income statement total income
    calculateTotalIncome(): number {
      let total_income = 0;
      for (let income of this.income) {
          total_income += income.amount;
      }
      return total_income;
  }
  // update income statement total expense
   calculateTotalExpense(): number {
        let total_expenses = 0;
        for (let expense of this.expense) {
            total_expenses += expense.amount;
        }
        return total_expenses;
      }
      calculateTotalNetIncome() {
            this.calculateTotalIncome() - this.calculateTotalExpense();
    
        }
      
    }
  


