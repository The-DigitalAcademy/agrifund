/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 30 Jul 2023
    UPDATED DATE: 31 Aug 2023 

    DESCRIPTION:
     This service is used for managing the overall farmer's portfolio data.
     All portfolio data is fetched from the api here.

    PARAMETERS:
    private _apiService: ApiService -> used to make use of all api connections methods within this service
    private _authService: AuthService -> used to get methods related to authenticating a user

-------------------------------------------------------------------------------------------------*/
import { Inject, Injectable, forwardRef } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { AuthService } from '../authentication-service/auth.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FarmerPortfolio } from 'src/app/_models/FarmerPortfolio';
import { IncomeStatement } from 'src/app/_models/IncomeStatement';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { Assets } from 'src/app/_models/Assets';
import { HttpClient } from '@angular/common/http';
import { FarmerFarm } from 'src/app/_models/farmerFarm';
import { FarmerCrop } from 'src/app/_models/farmerCrop';
import { FarmerPlot } from 'src/app/_models/farmerPlot';



@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    setFarmerIncomeStatements() {
        throw new Error('Method not implemented.');
    }
    private assets: Assets[] = [];
    // stores the farmer portfolio as a array instance of farmer portfolio
    private farmerPortfolio: FarmerPortfolio[] = [];
    // stores the farmer portfolio data values as a behavior subject -> initializes as empty
    private farmerPortfolio$: BehaviorSubject<FarmerPortfolio> =
        new BehaviorSubject<FarmerPortfolio>({
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            cellNumber: '',
            farms: [],
        });
    // stores a user's first name as an observable, default is just 'User
    private userFirstName$: BehaviorSubject<string> =
        new BehaviorSubject<string>('User');

    // stores the farmers farm data
    private farmerFarm: FarmerFarm[] = [];
    // stores the farmers farm data as an observable -> initializes as empty
    private farmerFarm$: BehaviorSubject<FarmerFarm> =
        new BehaviorSubject<FarmerFarm>({
            id: 0,
            numberOfEmployees: 0,
            farmName: '',
            farmAddress: '',
            yearsActive: 0,
            address: '', //stores residential address
            farmingReason: '', //stores the reason for needing funding
            crops: [],
            plots: [],
            assets: [],
            incomeStatements: [],
        });

    // stores the farmers portfolio data
    private farmerIncomeStatements: IncomeStatement[] = [];
    // stores the income statement data as an observable -> -> initializes as empty
    private incomeStatements$: BehaviorSubject<IncomeStatement> =
        new BehaviorSubject<IncomeStatement>({
            id: 0,
            farmId: 0,
            statementDate: '',
            totalIncome: 0,
            totalExpenses: 0,
            netIncome: 0,
            incomeStatementItems: [],
        });

    // stores the income statement data as an observable -> -> initializes as empty
    private incomeStatementItems$: BehaviorSubject<IncomeStatementItem> =
        new BehaviorSubject<IncomeStatementItem>({
            id: 0,
            statementId: 0, //IncomeStatement;
            category: '',
            amount: 0,
            proofOfReceipt: '',
            description: '',
            date: '', //date of the record
        });

    constructor(private _apiService: ApiService) {
        // sets the farmer portfolio when the service is called
        // this.setFarmerPortfolio();
    }

    /*---------------------------------
        ALL PORTFOLIO DATA
    ----------------------------------*/
    // sets the farmer portfolio data
    setFarmerPortfolio() {
        this._apiService.getFarmerPortfolio().subscribe(
            (result: any) => {
                // console.log('API Response:', result.data);
                this.farmerPortfolio = result.data;
                // adds the results from the api to the farmerPortfolio Observables
                this.farmerPortfolio$.next(result.data);
            },
            error => {
                console.error(`Error occurred while getting a user:`, error);
            }
        );
    }

    // gets method for farmer portfolio data
    getFarmerPortfolio(): Observable<FarmerPortfolio> {
        return this.farmerPortfolio$;
    }

    /*---------------------------------
        FARM DATA
    ----------------------------------*/
    // gets the farmer's fam data
    getFarmerFarm(): Observable<FarmerFarm[]> {
        // returns the user's farm data from the portfolio
        return this.farmerPortfolio$.pipe(map(portfolio => portfolio.farms));
    }

    // sets the value for the farmer farm array and observable
    setFarmerFarm() {
        // gets the farmer farm data and assigns it to the array and the observable
        this.getFarmerFarm().subscribe((farm: FarmerFarm[]) => {
            // assigns data from get farmer farm to the farmer farm array
            this.farmerFarm = farm;

            this.farmerFarm.forEach(farm => {
                this.farmerFarm$.next(farm);
            });
        });
    }

    // sets and gets the farm's name
    getFarmName() {
        this.setFarmerFarm();
        // gets the name of a farm
        const farmName = this.farmerFarm.map(farm => {
            return farm.farmName;
        });
        // returns the farm name within the first index of the farm name array
        return farmName[0];
    }

    getUserFirstName(): Observable<string> {
        this.farmerPortfolio$.subscribe((portfolio: FarmerPortfolio) => {
            this.userFirstName$.next(portfolio.firstName);
        });
        return this.userFirstName$;
    }

    editPortfolio(portfolio: FarmerPortfolio) {}

    /*---------------------------------
        INCOME STATEMENT DATA
    ----------------------------------*/
    // used to get farmer income statements
    getFarmerIncomeStatements(): Observable<IncomeStatement[]> {
        // returns the income statement for a farm
        return this.farmerFarm$.pipe(map(farm => farm.incomeStatements));
    }

    getFarmerCropInfo(): Observable<FarmerCrop[]> {
        return this.farmerFarm$.pipe(map(farm => farm.crops));
    }
    getFarmerPlotInfo(): Observable<FarmerPlot[]> {
        return this.farmerFarm$.pipe(map(farm => farm.plots));
    }

    getFarmerAssetInfo(): Observable<Assets[]> {
        return this.farmerFarm$.pipe(map(farm => farm.assets));
    }
}