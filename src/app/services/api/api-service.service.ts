import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ApiServiceService {
    constructor(private http: HttpClient) {}

    // base string for api connection
    private baseUrl = 'localhost:3001/agrifund';
    private bookkeep = 'income-statement';

    /* --------------------------------
        BOOKKEEP / INCOME STATEMENT
    ---------------------------------*/

    // get income statement data based on the farm id
    getIncomeStatements(farmId: number) {
        return this.http.get(`${this.baseUrl}/${this.bookkeep}/${farmId}`);
    }

    // getIncomeStement by their id
    getIncomeStament(statmentId: number) {
        return this.http.get(`${this.baseUrl}/${this.bookkeep}/${statmentId}`);
    }

    // get all bookkeep records based on the statement id
    getStatementItems(statementId: number) {
        return this.http.get(`${this.baseUrl}/${this.bookkeep}/${statementId}`);
    }

    // get a single income statement item
    getStamentItem(recordId: number) {
        return this.http.get(`${this.baseUrl}/${this.bookkeep}/${recordId}`);
    }

    // add a new income statement record
    addRecord(body: any) {
        return this.http.post(`${this.baseUrl}/${this.bookkeep}`, body);
    }

    // update data for a single income statement record
    updateRecord(recordId: number, body: any) {
        return this.http.put(
            `${this.baseUrl}/${this.bookkeep}/${recordId}`,
            body
        );
    }

    // get income statement records between two dates

    //get an income statement record from a search text
}
