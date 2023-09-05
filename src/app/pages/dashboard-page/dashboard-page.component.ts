/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 29 Aug 2023 

    DESCRIPTION:
       This component displays a farmer's portfolio data summary
    PARAMETERS:
    _portfolioService: PortfolioService -> used to get farmer portfolio data
        
-------------------------------------------------------------------------------------------------*/

import { User } from './../../_models/User';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { FarmService } from 'src/app/_services/farm-service/farm.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
    bookkeepingRecords$!: Observable<IncomeStatementItem[]>;
    // stores the currently logged in user data
    user!: User;
    // subscription for portfolio service
    private portfolioSubscription = new Subscription();

    constructor(
        private _portfolioService: PortfolioService,
        private _farmService: FarmService
    ) {}

    ngOnInit() {

        this._portfolioService.setFarmerPortfolio()
        // gets the farmers portfolio information
        this.portfolioSubscription = this._portfolioService
            .getFarmerPortfolio()
            .subscribe(data => {
                console.table(data);
            });

        // gets the farmers farm information
        this._portfolioService.getFarmerFarm().subscribe(data => {
            console.log(data);
            // gets the farmers farm name
            console.log(this._portfolioService.getFarmName());
        });
    }

    ngOnDestroy() {
        // unsubscribe from subscriptions
        this.portfolioSubscription.unsubscribe();
    }
}
