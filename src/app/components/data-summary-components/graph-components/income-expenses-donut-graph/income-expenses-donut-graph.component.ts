import { IncomeStatement } from 'src/app/_models/IncomeStatement';
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

import { Chart, registerables } from 'chart.js/auto';
import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/_services/chart-service/chart.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { IncomeStatementService } from 'src/app/_services/income-statement-service/income-statement.service';

Chart.register(...registerables);
@Component({
    selector: 'app-income-expenses-donut-graph',
    templateUrl: './income-expenses-donut-graph.component.html',
    styleUrls: ['./income-expenses-donut-graph.component.css'],
})
export class IncomeExpensesDonutGraphComponent implements OnInit {
    // stores the value of the total expenses/money out for an income statement of the year
    total_expense = 0;
    // stores the value of the total income/money in for an income statement of the year
    total_income = 0;
    // stores the value of the total income/money in for an income statement of the year
    net_income = 0;
    // stores the data used for a chart
    chartdata: any = [];

    constructor(
        private chartService: ChartService,
        private _portfolioService: PortfolioService,
        private _incomeStatementService: IncomeStatementService
    ) {}

    ngOnInit() {
        // ensures the the portfolio data is set to extract income statement info from
        this._portfolioService.setFarmerPortfolio();

        // method of fetching data and posting data of net income and this.total_income

        this.chartService.getTotalNetIncome().subscribe(result => {
            this.chartdata = result;
            if (this.chartdata != null) {
                for (let i = 0; i < this.chartdata.length; i++) {
                    this.net_income.push(this.chartdata[i].amount);
                    // this.total_expense.push(this.chartdata[i].amount)
                }
                this.RenderChart(this.net_income, this.total_income);
            }

            // console.log(this.net_income)
        });

        this.chartService.getTotalIncome().subscribe(result => {
            this.chartdata = result;
            if (this.chartdata != null) {
                for (let i = 0; i < this.chartdata.length; i++) {
                    this.total_income.push(this.chartdata[i].amount);
                }
                this.RenderChart(this.total_income, this);
            }
            // console.log(this.total_income)
        });
    }

    // function for rendering chart based on the properties passed
    RenderChart(net_income: any, total_income: any) {
        new Chart('incomeExpensesDoughnutChart', {
            type: 'doughnut',
            data: {
                labels: ['Money Out', 'Money In'],
                datasets: [
                    {
                        label: 'Money In/Out Summary',
                        data: [net_income, total_income],
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
