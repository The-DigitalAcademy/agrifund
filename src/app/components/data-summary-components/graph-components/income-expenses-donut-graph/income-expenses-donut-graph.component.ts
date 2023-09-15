/* ------------------------------------------------------------------------------------------------
    AUTHOR: Bolebo Mohlala, Monique Nagel
    CREATE DATE: 08 Aug 2023 
    UPDATED DATE: 06 Sept 2023 

    DESCRIPTION:
        This component is responsible for the creation and generation of a donut chart for income 
        and expenses
    PARAMETERS:
        _incomeStatementService: IncomeStatementService -> used to access income statement service methods
        
-------------------------------------------------------------------------------------------------*/
import { Chart } from 'chart.js/auto';
import { Component, OnInit } from '@angular/core';
import { IncomeStatementService } from 'src/app/_services/income-statement-service/income-statement.service';
import { Observable } from 'rxjs';
@Component({
    selector: 'app-income-expenses-donut-graph',
    templateUrl: './income-expenses-donut-graph.component.html',
    styleUrls: ['./income-expenses-donut-graph.component.css'],
})
export class IncomeExpensesDonutGraphComponent implements OnInit {
    // gets value for income from the dashboard parent
    totalExpense$!: Observable<number>;
    // stores the value of the total income/money in for an income statement of the year
    totalIncome$!: Observable<number>;
    //stores the number value of total income
    totalIncome = 0;
    // stores the number value of total expense
    totalExpense = 0;

    constructor(private _incomeStatementService: IncomeStatementService) {}

    ngOnInit() {
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

        this.renderChart(this.totalIncome, this.totalExpense);
    }

    // function for rendering chart based on the properties passed
    renderChart(income: number, expense: number) {
        new Chart('incomeExpensesDoughnutChart', {
            type: 'doughnut',
            data: {
                labels: ['Money In', 'Money Out'],
                datasets: [
                    {
                        label: '',
                        data: [income, expense],
                        backgroundColor: ['#5A6537', '#D15F20'],
                        hoverOffset: 5,
                    },
                ],
            },
            // size of the graph properties
            options: {
                plugins: {
                    legend: {
                        position: 'right',
                        align: 'start',
                    },
                },
                // maintainAspectRatio: true,
                aspectRatio: 1.5,
            },
        });
    }
}
