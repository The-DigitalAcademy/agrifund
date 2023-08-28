    // AUTHOR: Bolebo
    // CREATE DATE: 08 AUG 2023
    // UPDATED DATE: 17 Aug 2023 

    // DESCRIPTION:
    // I INJECTED A SERVICE "CHARTSERVICE" TO FETCH DATA FROM THE API AND METHODS TO FETCH CHART INFO FROM THE MOCK API TO DISPLAY DATA. ADDED A METHOD TO RENDER CHART INFO.
    // calculateTotalIncome: update income statement total income
    // calculateTotalExpense: update income statement total expense
    // calculateTotalNetIncome:  method to calculate overall profit
    // Getchartinfo -> A METHOD TO FETCH DATA INFO FROM THE MOCK API
    // fetch total income
    // fetch total net income (profit)




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncomeStatement } from 'src/app/models/IncomeStatement';


// const API_BASE_URL = 'https://agrifund.tech/api/v1/farmers/0001180588087';
@Injectable({
  providedIn: 'root',
})
export class ChartService {
  // private readonly apiUrl:string = 'https://agrifund.tech/api/v1/farmers/0001180588087';

  income: any
  expense: any
  constructor(private http: HttpClient) { }

  // method to fetch data from the mock API
  Getchartinfo(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/total_expense");
    // return this.http.get<amount>('${this.apiUrl}/?result=${}')
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
    return this.http.get("");
    
  }
  // fetch total income
  getTotalIncome(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/total_income");
  // return this.http.get<any>('${this.apiUrl}/?result=${}')
  }
  // fetch total net income (profit)
  getTotalNetIncome(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/net_income");
  // return this.http.get<any>('${this.apiUrl}/?result=${}')
  }
  // private processIncomeStatement(response: IncomeStatement): Response {
  //   return {
  //     data: { ...response.data },
  //     data: response.data.map((farm_id:number) =>{}) 
  //   };
  // }

}




