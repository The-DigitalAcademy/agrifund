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
    // base url of api connection
    private BASE_URL = `${environment.API_URL}`;
    //Headers
    // headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    /* --------------------------------
        USER CONNECTION STRINGS
    ---------------------------------*/
    // authentication url of api connection
    private AUTH_URL = this.BASE_URL + '/auth';
    // register url of api connection
    private REGISTER_URL = this.AUTH_URL + '/register';
    // users url for api connection
    private USERS_URL = this.BASE_URL + '/users';

    /* --------------------------------
        FARMER USER CONNECTION STRINGS
    ---------------------------------*/
    // authenticate a farmer user
    private FARMER_AUTH_URL = this.AUTH_URL + '/farmer';
    // conneciotn to register a farmer user 
    private REGISTER_FARMER_URL = this.REGISTER_URL + '/farmer';
    // farmers url string piece for api connection
    private FARMERS_URL = this.BASE_URL + '/farmers';
    // farmer url string piece for api connection to get farmer information
    private FARMER_URL = this.FARMERS_URL + '/farmer';
    // connection string for farmer OTP function
    private FARMER_OTP_URL = this.FARMERS_URL + '/otp'
    
    /* --------------------------------
       FARMER PORTFOLIO CONNECTION STRINGS
    ---------------------------------*/
    // connection string for farmer asset info
    private FARMER_ASSET_URL = this.BASE_URL + '/assets';
    //connection string for farmer crop info
    private FARMER_CROP_URL = this.BASE_URL + '/crops';
    // connection string for farmer plot info
    private FARMER_PLOT_URL = this.BASE_URL + '/plots'
    // connection string for a farmer's farm info
    private FARMER_FARM_URL = this.BASE_URL + '/farms';

    /* --------------------------------
        ADMIN USER CONNECTION STRINGS
    ---------------------------------*/

    /* --------------------------------
        BOOKKEEPING CONNECTION STRINGS
    ---------------------------------*/
    private INCOME_STATEMENT_URL = this.BASE_URL + '/income-Statements';

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
        return this.http.post(`${this.FARMER_ASSET_URL}`, body);
    }

    // gets all equipment items for a farmer
    getAllEquipment() {
        return this.http.get(`${this.FARMER_ASSET_URL}`);
    }

    // update data for a single equipment record
    editEquipment(equipmentId: number, body: any) {
        return this.http.put(`${this.FARMER_ASSET_URL}/${equipmentId}`, body);
    }

    // get a single equipment item by id
    getEquipmentById(equipmentId: number) {
        return this.http.get(`${this.FARMER_ASSET_URL}/${equipmentId}`);
    }

    /* --------------------------------
        BOOKKEEP / INCOME STATEMENT
    ---------------------------------*/

    // get an income statement data based on the farm id
    getIncomeStatementsByFarm(farmId: number) {
        return this.http.get(`${this.INCOME_STATEMENT_URL}/${farmId}`);
    }

    // get an income statement by their id
    getIncomeStatementById(statementId: number) {
        return this.http.get(`${this.INCOME_STATEMENT_URL}/${statementId}`);
    }

    // get all bookkeeping records
    getAllStatementItems() {
        return this.http.get(`${this.INCOME_STATEMENT_URL}`);
    }

    // get all bookkeeping records based on the statement id
    getRecordsByStatementId(statementId: number) {
        return this.http.get(`${this.INCOME_STATEMENT_URL}/${statementId}`);
    }

    // get a single income statement item
    getStatementItemById(recordId: number) {
        return this.http.get(`${this.INCOME_STATEMENT_URL}/${recordId}`);
    }

    // add a new income statement record
    addRecord(body: any) {
        return this.http.post(`${this.INCOME_STATEMENT_URL}`, body);
    }

    // update data for a single income statement record
    updateRecord(recordId: number, body: any) {
        return this.http.put(`${this.INCOME_STATEMENT_URL}/${recordId}`, body);
    }

    // delete a bookkeeping record
    deleteIncomeStatementItem(recordId: number) {
        return this.http.delete(`${this.INCOME_STATEMENT_URL}/${recordId}`);
    }

    // get income statement records between two dates

    //get an income statement record from a search text
    
}
