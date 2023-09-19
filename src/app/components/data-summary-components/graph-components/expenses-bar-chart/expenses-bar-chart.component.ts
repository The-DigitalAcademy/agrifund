/* ------------------------------------------------------------------------------------------------
    AUTHOR: Bolebo Mohlala, Monique Nagel
    CREATE DATE: 08 Aug 2023 
    UPDATED DATE: 18 Sept 2023 

    DESCRIPTION:
        This component is responsible for the creation and generation of a bar chart that summarizes
        the highest expenses for a farmer for the year selected on dashboard
    PARAMETERS:
        _incomeStatementService: IncomeStatementService -> used to access income statement service methods
        
-------------------------------------------------------------------------------------------------*/
import { EMPTY, Observable, Subscription } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { IncomeStatementItemService } from 'src/app/_services/income-statement-item-service/income-statement-item.service';

@Component({
    selector: 'app-expenses-bar-chart',
    templateUrl: './expenses-bar-chart.component.html',
    styleUrls: ['./expenses-bar-chart.component.css'],
})
export class ExpensesBarChartComponent implements OnInit, OnDestroy {
    // subscription to store five highest income value
    private highestExpensesSubscription = new Subscription();
    // five highest expenses stored in array
    fiveHighestExpenses: IncomeStatementItem[] = [];
    // five hightest expenses as observable -> default is empty
    fiveHighestExpenses$!: Observable<IncomeStatementItem[]>;
    // stores the labels for a chart
    chartLabels: string[] = [];
    // stores the data used in the chart
    chartData: number[] = [];
    // stores the chart
    expenseBarChart: any = [];

    constructor(
        private _incomeStatementItemService: IncomeStatementItemService
    ) {}

    ngOnInit() {
        // assigns value for five highest expenses
        this.fiveHighestExpenses$ =
            this._incomeStatementItemService.getFiveHighestExpenses();
        // assigns five highest expenses to subscription
        this.highestExpensesSubscription = this.fiveHighestExpenses$.subscribe(
            (records: IncomeStatementItem[]) => {
                // assigns values from service method to fiveHighestExpenses Array
                this.fiveHighestExpenses = records;

                // loops through five highest expenses array to assign char labels and data
                this.fiveHighestExpenses.forEach(record => {
                    // adds the record description as a chart label
                    this.chartLabels.push(record.description);
                    // add the record amount as the chart data
                    this.chartData.push(record.amount);
                });
                // ensures that the chart has data before generating
                if (this.chartData.length >= 1 && this.chartData.length <= 5) {
                    // this.expenseBarChart.destroy();
                    this.renderChart(this.chartLabels, this.chartData);
                }
            }
        );
    }

    ngOnDestroy() {
        this.highestExpensesSubscription.unsubscribe();
        this.expenseBarChart.destroy();
        // if (this.chartData.length >= 1) {
        //     this.expenseBarChart.destroy();
        // }
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
                        backgroundColor: ['#D15F20'],
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
