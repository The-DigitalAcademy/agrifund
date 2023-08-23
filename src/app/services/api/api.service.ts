/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo, Monique, Kamo
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 17 Aug 2023 

    DESCRIPTION:
     This service is for all methods related to a user

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Users } from 'src/app/models/users';
import { Asset } from 'src/app/models/asset';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    // base string for api connection with current version of api
    // private baseUrl = `${environment.apiURL}`;
    // base string for mock api connection
    private baseUrl = `${environment.mockApiUrl}`;

    /* --------------------------------
        ADMIN USER CONNECTION STRINGS
    ---------------------------------*/
    // TODO admin

    // TODO farmer
    // used by admin to get farmer related data

    // TODO user
    private userURL = this.baseUrl + '/users'; // Define the URL for user registration
    private loginURL = this.baseUrl + '/login'; // Define the URL for user login

    /* --------------------------------
        FARMER CONNECTION STRINGS
    ---------------------------------*/
    private farmerAssetURL = this.baseUrl + '/assets';

    // gets a farmer by their id
    getFarmerUser(email: number): Observable<any> {
        
        return this.http.get(`${this.userURL}/${email}`);
    }

    // adds a new equipment item
    addEquipment(body: any) {
        return this.http.post(`${this.farmerAssetURL}`, body);
    }

    // gets all equipment items for a farmer
    getAllEquipment() {
        console.log(this.farmerAssetURL);
        return this.http.get(`${this.farmerAssetURL}`);
    }

    // update data for a single equipment record
    editEquipment(equipmentId: number, body: any) {
        return this.http.put(`${this.farmerAssetURL}/${equipmentId}`, body);
    }

    // get a single equipment item by id
    getEquipmentById(equipmentId: number) {
        return this.http.get(`${this.farmerAssetURL}/${equipmentId}`);
    }

    /* --------------------------------
        BOOKKEEP CONNECTION STRINGS
    ---------------------------------*/
    private statementsUrl = this.baseUrl + '/incomeStatements';
    private statementItemsUrl = this.baseUrl + '/incomeStatementItems';

    /* --------------------------------
        BOOKKEEP / INCOME STATEMENT
    ---------------------------------*/

    // get an income statement data based on the farm id
    getIncomeStatementsByFarm(farmId: number) {
        return this.http.get(`${this.statementsUrl}/${farmId}`);
    }

    // get an income statement by their id
    getIncomeStatementById(statementId: number) {
        return this.http.get(`${this.statementsUrl}/${statementId}`);
    }

    // get all bookkeeping records
    getAllStatementItems() {
        return this.http.get(`${this.statementItemsUrl}`);
    }

    // get all bookkeep records based on the statement id
    getrecordsByStatementId(statementId: number) {
        return this.http.get(`${this.statementItemsUrl}/${statementId}`);
    }

    // get a single income statement item
    getStatementItemById(recordId: number) {
        // console.log(`${this.statementItemsUrl}/${recordId}`);
        return this.http.get(`${this.statementItemsUrl}/${recordId}`);
    }

    // add a new income statement record
    addRecord(body: any) {
        // body.shift();
        // console.log(body);
        return this.http.post(`${this.statementItemsUrl}`, body);
    }

    // update data for a single income statement record
    updateRecord(recordId: number, body: any) {
        return this.http.put(`${this.statementItemsUrl}/${recordId}`, body);
    }

    // delete a bookkeeping record
    deleteIncomeStatementItem(recordId: number) {
        return this.http.delete(`${this.statementItemsUrl}/${recordId}`);
    }

    // get income statement records between two dates

    //get an income statement record from a search text

    // register user
    RegisterUser(user: any): Observable<any> {
        // const url = '/api/v1/auth/register/farmer';
        return this.http.post(this.userURL, user);
    }
    getRegisterUser(): Observable<any> {
        // console.log(this.userURL);
        return this.http.get(`${this.userURL}`);
    }


    // get record for a single user loggin in
    // getFarmerUser(userId:number) {
    //     // console.log(this.userURL);
    //     return this.http.get(`${this.userURL}/${userId}`);
    // }





    /* --------------------------------
        FARMER
    ---------------------------------*/
    // register user
    registerUser(user: any): Observable<any> {
        // Send a POST request to the user registration URL
        return this.http.post(this.userURL, user);
    }
    login(email: string, password: string): Observable<any> {
        // Create the request body with email and password
        const body = { email, password };
        // Send a POST request to the login URL with the provided credentials
        return this.http.post(this.loginURL, body);
    }
    
}
