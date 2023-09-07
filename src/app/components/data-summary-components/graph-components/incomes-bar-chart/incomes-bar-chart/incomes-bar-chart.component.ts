/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 07 Sept 2023 
    UPDATED DATE: 

    DESCRIPTION:
        This component is responsible for the creation and generation of a bar chart that summarizes
        the highest incomes for a farmer for the year selected on dashboard
    PARAMETERS:
        _incomeStatementService: IncomeStatementService -> used to access income statement service methods
        
-------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { IncomeStatementItemService } from 'src/app/_services/income-statement-item-service/income-statement-item.service';

@Component({
    selector: 'app-incomes-bar-chart',
    templateUrl: './incomes-bar-chart.component.html',
    styleUrls: ['./incomes-bar-chart.component.css'],
})
export class IncomesBarChartComponent implements OnInit {
    constructor(
        private _incomeStatementItemService: IncomeStatementItemService
    ) {}
    // stores the five highest incomes in an observable
    fiveHighestIncomes$: Observable<IncomeStatementItem>[] = [];
    // five highest incomes stored in array
    fiveHighestIncomes: IncomeStatementItem[] = [];
    // stores the labels for a chart
    chartLabels: string[] = [];
    // stores the data used in the chart
    chartData: number[] = [];

    ngOnInit() {
        this._incomeStatementItemService
            .getFiveHighestExpenses()
            .subscribe((records: IncomeStatementItem[]) => {
                // assigns values from service method to fiveHighestExpenses Array
                this.fiveHighestIncomes = records;
            });

        // loops through five highest expenses array to assign char labels and data
        this.fiveHighestIncomes.forEach(record => {
            // adds the record description as a chart label
            this.chartLabels.push(record.description);
            // add the record amount as the chart data
            this.chartData.push(record.amount);
        });

        this.renderChart(this.chartLabels, this.chartData);
    }

    renderChart(chartLabels: string[], chartData: number[]) {
        new Chart('barChart', {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: '',
                        data: chartData,
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
