// AUTHOR: Monique
//     CREATE DATE: 08 AUG 2023
//     UPDATED DATE: 17 Aug 2023 

//     DESCRIPTION:
//     I INJECTED A SERVICE "CHARTSERVICE" TO FETCH DATA FROM THE API AND METHODS TO FETCH CHART INFO FROM THE MOCK API TO DISPLAY DATA. ADDED A METHOD TO RENDER CHART INFO.
//     calculateTotalIncome: update income statement total income
//     calculateTotalExpense: update income statement total expense
//     calculateTotalNetIncome:  method to calculate overall profit
//     Getchartinfo -> A METHOD TO FETCH DATA INFO FROM THE MOCK API
//    fetch total income
//    fetch total net income (profit)




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ChartService {

  income: any
  expense: any
  constructor(private http: HttpClient) { }

  // method to fetch data from the mock API
  Getchartinfo() {
    return this.http.get("http://localhost:3000/total_expense");
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
  // method to calculate overall profit
  calculateTotalNetIncome() {
    this.calculateTotalIncome() - this.calculateTotalExpense();
  }
  // fetch total income
  getTotalIncome() {
    return this.http.get("http://localhost:3000/total_income");
  }
  // fetch total net income (profit)
  getTotalNetIncome() {
    return this.http.get("http://localhost:3000/net_income");
  }

}




