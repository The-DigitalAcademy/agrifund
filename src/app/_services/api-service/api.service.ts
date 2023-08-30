
/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 30 Aug 2023 

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
import { Farm } from 'src/app/_models/Farm';
import { User } from 'src/app/_models/User';
import { Asset } from 'src/app/_models/asset';
import { Crop } from 'src/app/_models/crop';
import { Plot } from 'src/app/_models/plot';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}
    // base url of api connection
    private BASE_URL = environment.API_URL;
    //Headers
    // headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    /* ------------------------------------
        AUTHENTICATION CONNECTION STRINGS
    ---------------------------------------*/
    // authentication url of api connection
    private AUTH_URL = this.BASE_URL + '/auth';
    // register url of api connection
    private REGISTER_URL = this.AUTH_URL + '/register';
    // login url of api connection
    private LOGIN_URL = this.AUTH_URL + '/login';
    // users url for api connection
    private USERS_URL = this.BASE_URL + '/users';

    /* --------------------------------
        FARMER USER CONNECTION STRINGS
    ---------------------------------*/
    // farmers url string piece for api connection
    private FARMERS_URL = this.BASE_URL + '/farmers';
    // farmer url string piece for api connection
    private FARMER_URL = this.FARMERS_URL + '/farmer';
    // farmer url string piece to get otp
    private FARMER_OTP_URL = this.FARMERS_URL + '/otp';
    // farmers portfolio api connection string
    private FARMERS_PORTFOLIO_URL = this.FARMERS_URL + '/portfolio';
    /* --------------------------------
       FARMER PORTFOLIO CONNECTION STRINGS
    ---------------------------------*/
    // connection string for a farmer's farm info
    private FARMER_FARM_URL = this.BASE_URL + '/farms';
    // connection string for farmer asset info
    private FARMER_ASSET_URL = this.BASE_URL + '/assets';
    //connection string for farmer crop info
    private FARMER_CROP_URL = this.BASE_URL + '/crops';
    // connection string for farmer plot info
    private FARMER_PLOT_URL = this.BASE_URL + '/plots';
    /* --------------------------------
        BOOKKEEPING CONNECTION STRINGS
    ---------------------------------*/
    // connection string for income statement
    private INCOME_STATEMENT_URL = this.BASE_URL + '/income-Statements';
    // connection string for income statement items
    private INCOME_STATEMENT_ITEM_URL = this.BASE_URL + '/items';

    /* --------------------------------
        AUTHENTICATION REQUESTS
    ---------------------------------*/
    // POST function for a farmer to login
    loginUser(loginBody: any) {
        return this.http.post(`${this.LOGIN_URL}`, loginBody);
    }

    // POST function for registering a new farmer user
    registerUser(userBody: User) {
        return this.http.post(`${this.REGISTER_URL}`, userBody);
    }

    /* --------------------------------
        USER REQUESTS
    ---------------------------------*/
    // GET function to get a user by their email -> ADMIN USE!
    getUserByEmail(userEmail: string) {
        return this.http.get(`${this.USERS_URL}/${userEmail}`);
    }

    // GET function to get an OTP to reset password
    getResetPasswordOTP(userEmail: string) {
        return this.http.get(`${this.USERS_URL}/${userEmail}`);
    }

    // GET function to get all users -> ADMIN USE!
    getAllUsers() {
        return this.http.get(`${this.USERS_URL}`);
    }

    // PATCH function to update an admin password
    updateAdminPassword(adminEmail: string, passwordBody: any) {
        return this.http.patch(`${this.USERS_URL}/${adminEmail}`, passwordBody);
    }

    /* --------------------------------
        FARMER REQUESTS
    ---------------------------------*/
    // GET function to get all farmers -> ADMIN USE
    getAllFarmers() {
        return this.http.get(`${this.FARMERS_URL}`);
    }

    // PUT function to update a farmers details
    updateFarmerInfo(farmerInfoBody: any) {
        return this.http.put(`${this.FARMERS_URL}`, farmerInfoBody);
    }

    // PATCH function to update a farmers password
    changeFarmerPassword(farmerEmail: string, passwordResetBody: any) {
        return this.http.patch(
            `${this.FARMERS_URL}/${farmerEmail}`,
            passwordResetBody
        );
    }

    // GET function to get a farmer's portfolio data
    getFarmerPortfolio() {
        return this.http.get(`${this.FARMERS_PORTFOLIO_URL}`);
    }

    // GET function to get an OTP for a farmer
    getFarmerOTP(farmerEmail: string) {
        return this.http.get(`${this.FARMER_OTP_URL}/${farmerEmail}`);
    }

    // GET function to get a farmer by their id number -> ADMIN USE!
    getFarmerById(farmerId: string) {
        return this.http.get(`${this.FARMER_URL}/${farmerId}`);
    }

    /* --------------------------------
        FARMER FARM REQUESTS
    ---------------------------------*/
    // GET function for getting a farmer's farm data by the id
    getFarmById(farmId: number) {
        return this.http.get(`${this.FARMER_FARM_URL}/${farmId}`);
    }

    // GET function to get a farmer's farm data by the farm name
    getFarmByName(farmName: string) {
        return this.http.get(`${this.FARMER_FARM_URL}/${farmName}`);
    }

    // GET function to get all farms
    getAllFarms() {
        return this.http.get(`${this.FARMER_FARM_URL}`);
    }

    // POST function for creating a farmer's farm data
    addFarm(farmBody: any) {
        return this.http.post(`${this.FARMER_FARM_URL}`, farmBody);
    }

    // PUT function to update a farmer's farm data
    updateFarm(farmId: number, farmBody: any) {
        return this.http.put(`${this.FARMER_FARM_URL}/${farmId}`, farmBody);
    }

    // DELETE function to delete a farmer's farm data
    deleteFarm(farmName: string) {
        return this.http.delete(`${this.FARMER_FARM_URL}/${farmName}`);
    }

    /* --------------------------------
        FARMER ASSET REQUESTS
    ---------------------------------*/
    // GET function to get a farm asset by its id
    getAssetById(assetId: number) {
        return this.http.get(`${this.FARMER_ASSET_URL}/${assetId}`);
    }

    // PUT function to update a farm asset's details
    updateAsset(assetId: number, assetBody: any) {
        return this.http.put(`${this.FARMER_ASSET_URL}/${assetId}`, assetBody);
    }

    // POST function to add a new equipment/asset item
    addAsset(assetBody: any, farmName: any) {
        return this.http.post(
            `${this.FARMER_ASSET_URL}/${farmName}`,
            assetBody
        );
    }

    // DELETE function to delete a single farm asset
    deleteAsset(assetId: number) {
        return this.http.delete(`${this.FARMER_ASSET_URL}/${assetId}`);
    }

    // PATCH function to upload proof of ownership for an asset
    uploadAssetOwnershipProof(assetId: number, ownershipProof: File) {
        return this.http.patch(
            `${this.FARMER_ASSET_URL}/${assetId}`,
            ownershipProof
        );
    }

    // GET function to get all assets of a farmer by the farmName
    getAllFarmAssets(farmName: string) {
        return this.http.get(`${this.FARMER_ASSET_URL}/${farmName}`);
    }

    // PUT function to update data for a single asset
    editEquipment(equipmentId: number, body: any) {
        return this.http.put(`${this.FARMER_ASSET_URL}/${equipmentId}`, body);
    }

    /* --------------------------------
        FARMER CROP REQUESTS
    ---------------------------------*/
    // GET function to get a crop by id
    getCropById(cropId: number) {
        return this.http.get(`${this.FARMER_CROP_URL}/${cropId}`);
    }

    // PUT function to update a farmer's crop info
    updateCrop(cropId: number, cropBody: any) {
        return this.http.put(`${this.FARMER_CROP_URL}/${cropId}`, cropBody);
    }

    // DELETE function for a farmer's crop
    deleteCrop(cropId: number) {
        return this.http.delete(`${this.FARMER_CROP_URL}/${cropId}`);
    }

    // POST function for creating a new crop for a farmer
    addCrop(farmName: string, cropBody: any) {
        return this.http.post(`${this.FARMER_CROP_URL}/${farmName}`, cropBody);
    }

    // GET function to get all farmer crops
    getAllCrops(farmName: string) {
        return this.http.get(`${this.FARMER_CROP_URL}/${farmName}`);
    }
    /* --------------------------------
        FARMER PLOT REQUESTS
    ---------------------------------*/
    // GET function to get a plot by id
    getPlotById(plotId: number) {
        return this.http.get(`${this.FARMER_PLOT_URL}/${plotId}`);
    }

    // PUT function to update a farmer's plot data
    updatePlot(plotId: number, plotBody: any) {
        return this.http.put(`${this.FARMER_PLOT_URL}/${plotId}`, plotBody);
    }

    // DELETE function to delete a farmer's plot data
    deletePlot(plotId: number) {
        return this.http.delete(`${this.FARMER_PLOT_URL}/${plotId}`);
    }

    // POST function to create a new plot for a farmer
    addPlot(farmName: string, plotBody: any) {
        return this.http.post(`${this.FARMER_PLOT_URL}/${farmName}`, plotBody);
    }

    // PATCH function to upload proof of plot ownership
    uploadPlotOwnershipProof(plotId: number, ownershipProof: File) {
        return this.http.patch(
            `${this.FARMER_PLOT_URL}/${plotId}`,
            ownershipProof
        );
    }

    // GET function to get all plots for a farmer
    getAllPlots(farmName: string) {
        return this.http.get(`${this.FARMER_PLOT_URL}/${farmName}`);
    }
    /* ----------------------------------------
        BOOKKEEPING INCOME STATEMENT REQUESTS
    ------------------------------------------*/
    // GET all an income statement data based on the farm id
    getIncomeStatementsByFarm(farmId: number) {
        return this.http.get(`${this.INCOME_STATEMENT_URL}/${farmId}`);
    }

    // GET an income statement by their id
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

    /* --------------------------------------------
        BOOKKEEPING INCOME STATEMENT ITEM REQUESTS
    ----------------------------------------------*/
}

