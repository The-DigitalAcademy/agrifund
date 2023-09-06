import { Observable } from 'rxjs';
/* ------------------------------------------------------------------------------------------------
    AUTHOR: Bolebo Mohlala Monique Nagel
    CREATE DATE: 08 Aug 2023 
    UPDATED DATE: 06 Sept 2023 

    DESCRIPTION:
        This component is responsible for the creation and generation of a donut chart for income 
        and expenses
    PARAMETERS:
        private router: Router -> used to route to other bookkeeping functions
        private _bookkeepingService: BookkeepingService -> used for bookkeeping income statement methods
        private _offcanvasService: NgbOffcanvas -> the ngBootstrap service for the offcanvas menu
        private _portfolioService: PortfolioService -> used to access portfolio service methods
        
-------------------------------------------------------------------------------------------------*/

import { Chart } from 'chart.js/auto';
import { Component, Input, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { IncomeStatementService } from 'src/app/_services/income-statement-service/income-statement.service';

@Component({
    selector: 'app-income-expenses-donut-graph',
    templateUrl: './income-expenses-donut-graph.component.html',
    styleUrls: ['./income-expenses-donut-graph.component.css'],
})
export class IncomeExpensesDonutGraphComponent implements OnInit {
    // gets value for income from the dashboard parent
    @Input() totalExpense$!: Observable<number>;
    // stores the value of the total income/money in for an income statement of the year
    @Input() totalIncome$!: Observable<number>;
    //stores the number value of total income
    totalIncome = 0;
    // stores the number value of total expense
    totalExpense = 0;

    constructor(
        private _portfolioService: PortfolioService,
        private _incomeStatementService: IncomeStatementService
    ) {}

    ngOnInit() {
        // ensures the the portfolio data is set to extract income statement info from
        this._portfolioService.setFarmerPortfolio();

        // sets the total expense to the one in the income statement service
        this.totalExpense$ = this._incomeStatementService.getTotalExpense();
        // assigns the value of the observable to the total expenses variable
        this.totalExpense$.subscribe(value => {
            this.totalExpense = value;
        });
        // sets the total income to the one in the income statement service
        this.totalIncome$ = this._incomeStatementService.getTotalIncome();
        // assigns the value of the observable to the total expenses variable
        this.totalIncome$.subscribe(value => {
            this.totalIncome = value;
        });

        this.RenderChart(this.totalIncome, this.totalExpense);
    }

    // function for rendering chart based on the properties passed
    RenderChart(income: number, expense: number) {
        new Chart('incomeExpensesDoughnutChart', {
            type: 'doughnut',
            data: {
                labels: ['Money In', 'Money Out'],
                datasets: [
                    {
                        label: '',
                        data: [income, expense],
                        backgroundColor: ['#5A6537', '#9BA66F'],
                        hoverOffset: 10,
                    },
                ],
            },
            // size of the graph properties
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.7,
            },
        });
    }
}
