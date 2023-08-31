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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, retry, throwError } from 'rxjs';
import { IncomeStatement } from 'src/app/_models/IncomeStatement';
import { catchError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChartService {
    private baseUrl = "";

    income: any;
    expense: any;
    constructor(private http: HttpClient) {}

    // method to fetch data from the mock API
    getFarmerByEmail() {
        return this.http.get<IncomeStatement>('http://localhost:3000/total_expense/')
        .pipe(
            retry(2), // retry a failed request up to 2 times
            catchError(this.handleError) // handling the error after failing to return data
        );

        
        // .pipe(map(response => ({
        //     totalExpenses: response.totalExpense
        // })))
        // return this.http.get<any>('http://localhost:3000/data');
        // return this.http.get<any[]>(`${this.baseUrl}`);
    }

    // update income statement total income
    calculateTotalIncome(): number {
        let total_income = 0;
        for (const income of this.income) {
            total_income += income.amount;
        }
        return total_income;
    }
    // update income statement total expense
    calculateTotalExpense(): number {
        let total_expenses = 0;
        for (const expense of this.expense) {
            total_expenses += expense.amount;
        }
        return total_expenses;
    }
    // method to calculate overall profit
    calculateTotalNetIncome() {
        this.calculateTotalIncome() - this.calculateTotalExpense();
        return this.http.get('');
    }
    // fetch total income
    getTotalIncome() {
        return this.http.get<IncomeStatement>('http://localhost:3000/total_income')
        .pipe(
            retry(2), // retry a failed request up to 2 times
            catchError(this.handleError) // handling the error after failing to return data
        );
        

        //  .pipe(map(response => ({
        //     totalExpenses: response.totalIncome
        // })))
        // return this.http.get<any[]>(`${this.baseUrl}`);
    }
    // fetch total net income (profit)
    getTotalNetIncome() {
        return this.http.get<IncomeStatement>('http://localhost:3000/net_income')
        .pipe(
            retry(2), // retry a failed request up to 2 times
            catchError(this.handleError) // handling the error after failing to return data
        );
        
        
        // .pipe(map(response => ({
        //     totalExpenses: response.totalNetIncome
        // })))
        // return this.http.get<any[]>(`${this.baseUrl}`);
    }

   
    private handleError(ex:HttpErrorResponse){
        if(ex.error instanceof ErrorEvent){
          console.log('client side error',ex.message);
        }
        else{
          console.log('server side error',ex.message);
        }
       return  throwError('something went wrong');
      }
}
