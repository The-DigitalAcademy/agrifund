// AUTHOR: Bolebo
//     CREATE DATE: 08 AUG 2023
//     UPDATED DATE: 21 Aug 2023

//     DESCRIPTION:
//     I INJECTED A SERVICE "CHARTSERVICE" TO FETCH DATA FROM THE API AND METHODS TO FETCH CHART INFO FROM THE MOCK API TO DISPLAY DATA. ADDED A METHOD TO RENDER CHART INFO
//     RenderChart -> A METHOD TO RENDER CHART INFO FROM THE MOCK API

import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { ChartService } from 'src/app/_services/chart-service/chart.service';

Chart.register(...registerables);
@Component({
    selector: 'app-expenses-bar-chart',
    templateUrl: './expenses-bar-chart.component.html',
    styleUrls: ['./expenses-bar-chart.component.css'],
})
export class ExpensesBarChartComponent {
    constructor(private chartService: ChartService) {}

    chartdata: any = [];
    total_expense: any = [];
    total_income: any = [];
    net_income: any = [];

    ngOnInit(): void {
        this.chartService.getFarmerByEmail().subscribe(result => {
            this.chartdata = result;
            if (this.chartdata != null) {
                for (let i = 0; i < this.chartdata.length; i++) {
                    this.total_expense.push(this.chartdata[i].amount);
                }
                this.RenderChart(this.total_expense);
            }
            console.log(this.total_expense)
        });

        // this.RenderChart();
    }

    // size of the graph properties
    RenderChart(total_expense: any) {
        new Chart('barchart', {
            type: 'bar',
            data: {
                labels: ['Water', 'Seed', 'Equipment', 'Fertilizer', 'Tools'],
                datasets: [
                    {
                        label: 'Expenses',
                        data: total_expense,
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
