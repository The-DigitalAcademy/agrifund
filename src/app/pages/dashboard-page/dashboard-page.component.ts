import { Farm } from 'src/app/_models/FarmerPortfolio';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { UserService } from 'src/app/_services/user-service/user.service';
import { FarmService } from 'src/app/_services/farm-service/farm.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
    bookkeepingRecords$!: Observable<IncomeStatementItem[]>;
    user!: User;

    constructor(
        private _portfolioService: PortfolioService,
        private _farmService: FarmService
    ) {}

    ngOnInit() {
        // this._portfolioService.getFarmerPortfolio().subscribe(() => {
        //     // this._portfolioService.getFarmName();
        //     console.table(this._farmService.getFarmName());
        // });
        // this._farmService.getFarmerFarm().subscribe(data => {
        //     console.table(this._farmService.getFarmName());
        // });
    }
}
