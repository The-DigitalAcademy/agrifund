import { Farm } from 'src/app/_models/FarmerPortfolio';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { UserService } from 'src/app/_services/user-service/user.service';

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
        this._portfolioService.getFarmerPortfolio().subscribe(() => {
            // this._portfolioService.getFarmName();
        });

        this._portfolioService.getFarmerFarm().subscribe((farm: Farm[]) => {
            console.table(farm);
        });
    }
}
