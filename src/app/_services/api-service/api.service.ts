/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo, Monique, Kamo
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 26 Aug 2023 

    DESCRIPTION:
     This service is used for all api connections 

    PARAMETERS:
    registerUser( newUser: User) -> receives an body that is an instance of User
    loginUser( email: string, password:string) -> both parameters passed should be a string

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    // base string for mock api connection
    // private BASE_URL = `${environment.mockApiUrl}`;

    // base url of api connection
    // private BASE_URL = `${environment.API_URL}`;
    private BASE_URL = "/api" + "/v1";
    //Headers
    headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    /* --------------------------------
        USER CONNECTION STRINGSs
    ---------------------------------*/
    // authentication url of api connection
    private AUTH_URL = this.BASE_URL + '/auth';
    // register url of api connection
    private REGISTER_URL = this.AUTH_URL + '/register';
    // users url for api connection
    private USERS_URL = this.BASE_URL + '/users';
    // authenticate a farmer user
    private FARMER_AUTH_URL = this.AUTH_URL + '/farmer';

    private REGISTER_FARMER_URL = this.REGISTER_URL + '/farmer';
    /* --------------------------------
       FARMER CONNECTION STRINGS
    ---------------------------------*/
    // farmers url string piece for api connection
    private FARMERS_URL = this.BASE_URL + '/farmers';
    // farmer url string piece for api connection to get farmer information
    private FARMER_URL = this.FARMERS_URL + '/farmer';
    // connection string to get farmer assets
    private farmerAssetURL = this.BASE_URL + '/assets';
    //

    /* --------------------------------
        BOOKKEEPING CONNECTION STRINGS
    ---------------------------------*/
    private statementsUrl = this.BASE_URL + '/incomeStatements';
    private statementItemsUrl = this.BASE_URL + '/incomeStatementItems';

    /* --------------------------------
        ADMIN USER CONNECTION STRINGS
    ---------------------------------*/

    /* --------------------------------
        USER
    ---------------------------------*/
    // POST function for a farmer to login
    loginUser(loginBody: any) {
        return this.http.post(`${this.FARMER_AUTH_URL}`, loginBody);
    }

    // TODO POST function for registering a new farmer user

    // GET function to get a user by their email
    getUserByEmail() {
        return this.http.get(`${this.USERS_URL}`);
    }

    // GET function to get a farmer by their email
    getFarmerByEmail() {
        return this.http.get(`${this.FARMER_URL}`);
    }

    /* --------------------------------
        FARMER
    ---------------------------------*/
    // POST function for registering a new farmer user
    registerFarmer(newFarmer: User) {
        return this.http.post(`${this.REGISTER_FARMER_URL}`, newFarmer);
    }

    // gets a farmer by their id
    getFarmerUser(userId: number): Observable<any> {
        return this.http.get(`${this.FARMERS_URL}/${userId}`);
    }

    // adds a new equipment item
    addEquipment(body: any) {
        return this.http.post(`${this.farmerAssetURL}`, body);
    }

    // gets all equipment items for a farmer
    getAllEquipment() {
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

    // get all bookkeeping records based on the statement id
    getRecordsByStatementId(statementId: number) {
        return this.http.get(`${this.statementItemsUrl}/${statementId}`);
    }

    // get a single income statement item
    getStatementItemById(recordId: number) {
        return this.http.get(`${this.statementItemsUrl}/${recordId}`);
    }

    // add a new income statement record
    addRecord(body: any) {
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
}
