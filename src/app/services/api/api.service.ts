import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
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
    private userURL = this.baseUrl + '/users';

    /* --------------------------------
        FARMER CONNECTION STRINGS
    ---------------------------------*/
    // url used to register a farmer user
    private registerFarmerURL = this.baseUrl;
    // url used to login a farmer user
    private loginFarmerURL = this.baseUrl + '/api/v1/auth/farmer';
    // TODO find farmer by email

    // TODO reset password

    // TODO send OTP

    // TODO farmer
    // TODO assets
    // TODO plot
    // TODO farm
    // TODO crop
    private farmerAssetURL = this.baseUrl + '/assets';

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
    getFarmerUser(userId:number) {
        // console.log(this.userURL);
        return this.http.get(`${this.userURL}/${userId}`);
    }





    /* --------------------------------
        FARMER
    ---------------------------------*/
    //add an equipment record
    addEquipment(body: any){
        return this.http.post(`${this.farmerAssetURL}`, body);
    }

    //get all equipment records
    getAllEquipment(){
        console.log(this.farmerAssetURL);
        return this.http.get(`${this.farmerAssetURL}`);
    }

     // get a single equipment item
     getEquipmentById(equipmentId: number) {
        return this.http.get(`${this.farmerAssetURL}/${equipmentId}`);
    }
    // update data for a single equipment record
    editEquipment(equipmentId: number, body : any) {
        return this.http.put(`${this.farmerAssetURL}/${equipmentId}`,body);
    }

   

}
