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
import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { AuthService } from '../authentication-service/auth.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FarmerPortfolio } from 'src/app/_models/FarmerPortfolio';
import { IncomeStatement } from 'src/app/_models/IncomeStatement';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { Assets } from 'src/app/_models/assets';
import { Farm } from 'src/app/_models/farm';

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
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

    // stores the farmers farm data
    private farmerFarm: Farm[] = [];
    // stores the farmers farm data as an observable -> initializes as empty
    private farmerFarm$: BehaviorSubject<Farm> = new BehaviorSubject<Farm>({
        id: 0,
        numberOfEmployees: 0,
        farmName: '',
        farmAddress: '',
        yearsActive: 0,
        address: '', //stores residential address
        farmingReason: '', //stores the reason for needing funding
        crops: [],
        assets: [],
        incomeStatements: [],
    });
    // stores the farmers portfolio data
    private farmerIncomeStatements: IncomeStatement[] = [];
    // stores the income statement data as an observable -> -> initializes as empty
    private incomeStatements$: BehaviorSubject<IncomeStatement> =
        new BehaviorSubject<IncomeStatement>({
            farm_id: 0,
            statement_date: '',
            total_income: 0,
            total_expenses: 0,
            incomeStatementItems: [],
        });

    // stores the income statement data as an observable -> -> initializes as empty
    private incomeStatementItems$: BehaviorSubject<IncomeStatementItem> =
        new BehaviorSubject<IncomeStatementItem>({
            id: 0,
            statement_id: 0, //IncomeStatement;
            category: '',
            amount: 0,
            proof: '',
            description: '',
            date: '', //date of the record
        });

    constructor(
        private _apiService: ApiService,
        private _authService: AuthService
    ) {
        // sets the farmer portfolio when the service is called
        this.setFarmerPortfolio();
    }

    /*---------------------------------
        ALL PORTFOLIO DATA
    ----------------------------------*/
    // sets the farmer portfolio data
    setFarmerPortfolio() {
        const userEmail = this._authService.getUserEmail();
        const sessionToken = this._authService.getSessionToken();

        // checks if the user email and session token is still valid
        if (!userEmail || !sessionToken) {
            console.error('User email or session token not available');
        }

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
    getFarmerFarm(): Observable<Farm[]> {
        // returns the user's farm data from the portfolio
        return this.farmerPortfolio$.pipe(map(portfolio => portfolio.farms));
    }

    // sets the value for the farmer farm array and observable
    setFarmerFarm() {
        // gets the farmer farm data and assigns it to the array and the observable
        this.getFarmerFarm().subscribe((farm: Farm[]) => {
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

    /*---------------------------------
        INCOME STATEMENT DATA
    ----------------------------------*/
    // used to get farmer income statements
    getFarmerIncomeStatements(): Observable<IncomeStatement[]> {
        // returns the income statement for a farm
        return this.farmerFarm$.pipe(map(farm => farm.incomeStatements));
    }

    // sets the value for the farmer income statement array and observable
    setFarmerIncomeStatements() {
        // const farm = { ...this.farmerFarm$.value };
        this.getFarmerIncomeStatements().subscribe(
            (incomeStatements: IncomeStatement[]) => {
                // assigns the values retrieved from the get method to the array
                this.farmerIncomeStatements = incomeStatements;
                // this.farmerIncomeStatements.forEach(statement => {
                //     farm.incomeStatements.push(statement);
                // });
            }
        );

        // this.incomeStatements$.next(farm.incomeStatements);
    }

    // used to get income statement record items of an income statement
    getFarmerIncomeStatementItem(): Observable<IncomeStatementItem[]> {
        this.getFarmerIncomeStatements().subscribe(statements => {
            // assigns the value retrieved from the get method to the income statement array
            this.farmerIncomeStatements = statements;
        });
        return this.incomeStatements$.pipe(
            map(statements => statements.incomeStatementItems)
        );
    }

}
