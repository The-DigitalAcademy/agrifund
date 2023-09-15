/* ------------------------------------------------------------------------------------------------
    AUTHOR: Bolebo Mohlala, Monique Nagel
    CREATE DATE: 08 Aug 2023 
    UPDATED DATE: 06 Sept 2023 

    DESCRIPTION:
        This component is responsible for the creation and generation of a bar chart that summarizes
        the highest expenses for a farmer for the year selected on dashboard
    PARAMETERS:
        _incomeStatementService: IncomeStatementService -> used to access income statement service methods
        
-------------------------------------------------------------------------------------------------*/
import { Observable } from 'rxjs';
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
    // five highest expenses stored in array
    fiveHighestExpenses: IncomeStatementItem[] = [];
    // stores the labels for a chart
    chartLabels: string[] = [];
    // stores the data used in the chart
    chartData: number[] = [];
    // stores the chart
    expenseBarChart: any = [];

    ngOnInit() {
        this._incomeStatementItemService
            .getFiveHighestExpenses()
            .subscribe((records: IncomeStatementItem[]) => {
                // assigns values from service method to fiveHighestExpenses Array
                this.fiveHighestExpenses = records;
            });

        // loops through five highest expenses array to assign char labels and data
        this.fiveHighestExpenses.forEach(record => {
            // adds the record description as a chart label
            this.chartLabels.push(record.description);
            // add the record amount as the chart data
            this.chartData.push(record.amount);
        });

        this.renderChart(this.chartLabels, this.chartData);
    }

    // size of the graph properties
    renderChart(chartLabels: string[], chartData: number[]) {
        this.expenseBarChart = new Chart('expenseBarChart', {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: '',
                        data: chartData,
                        backgroundColor: ['#9BA66F'],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
            },
        });
    }
}
