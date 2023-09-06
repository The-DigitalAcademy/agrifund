import { Observable } from 'rxjs';
/* ------------------------------------------------------------------------------------------------
    AUTHOR: Bolebo Mohlala, Monique Nagel
    CREATE DATE: 08 Aug 2023 
    UPDATED DATE: 06 Sept 2023 

    DESCRIPTION:
        This component is responsible for the creation and generation of a bar chart that summarizes
        the highest expenses for a farmer for the year selected on dashboard
    PARAMETERS:
        _portfolioService: PortfolioService -> used to access portfolio service methods
        _incomeStatementService: IncomeStatementService -> used to access income statement service methods
        
-------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { IncomeStatementItemService } from 'src/app/_services/income-statement-item-service/income-statement-item.service';

@Component({
    selector: 'app-expenses-bar-chart',
    templateUrl: './expenses-bar-chart.component.html',
    styleUrls: ['./expenses-bar-chart.component.css'],
})
export class ExpensesBarChartComponent implements OnInit {
    constructor(
        private _incomeStatementItemService: IncomeStatementItemService
    ) {}

    // stores the five highest expenses in an observable
    fiveHighestExpenses: Observable<IncomeStatementItem>[] = [];
    // stores the labels for a chart
    chartLabels: any = [];
    // stores the data used in the chart

    ngOnInit() {
        // sets the labels for the five highest expenses
        // this.fiveHighestExpenses.sub





        this.RenderChart();
    }

    // size of the graph properties
    RenderChart() {
        new Chart('barchart', {
            type: 'bar',
            data: {
                labels: ['Water', 'Seed', 'Equipment', 'Fertilizer', 'Tools'],
                datasets: [
                    {
                        label: '',
                        data: '',
                        backgroundColor: ['#5A6537'],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
            },
        });
    }
}
