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
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
    bookkeepingRecords$!: Observable<IncomeStatementItem[]>;
    user!: User;

    constructor(private _portfolioService: PortfolioService) {}

    ngOnInit() {
        // gets the farmers portfolio information
        this._portfolioService.getFarmerPortfolio().subscribe(data => {
            console.log(data);
        });

        // gets the farmers farm information
        this._portfolioService.getFarmerFarm().subscribe(data => {
            console.log(data);
            // gets the farmers farm name
            console.log(this._portfolioService.getFarmName());
        });

    }
}
