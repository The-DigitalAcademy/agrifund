// AUTHOR: Bolebo
//     CREATE DATE: 08 AUG 2023
//     UPDATED DATE: 21 Aug 2023 

//     DESCRIPTION:
//     I INJECTED A SERVICE "CHARTSERVICE" TO FETCH DATA FROM THE API AND METHODS TO FETCH CHART INFO FROM THE MOCK API TO DISPLAY DATA. ADDED A METHOD TO RENDER CHART INFO
//     RenderChart -> A METHOD TO RENDER CHART INFO FROM THE MOCK API

import { Component,OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart/chart.service';

Chart.register(...registerables);
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
 
  constructor(private chartService:ChartService) {}

 
  total_expense: any = [];
  total_income: any = [];
  net_income: any = [];

  ngOnInit(): void {
    this.chartService.Getchartinfo().subscribe(result=>{
      this.total_expense = result;
      console.log(this.total_expense)
    });
     // this.RenderChart(this.total_expense);
    this.RenderChart();
  }
  // RenderChart(total_expense:any)
   // size of the graph properties 
  RenderChart() {
    new Chart("barchart", {
      type: 'bar',
      data: {
        labels: ['Water', 'Seed', 'Equipment', 'Fertilizer', 'Tools'],
        datasets: [{
          label: 'Money Out Summary',
          data: [1200, 590, 350, 825, 900],
          backgroundColor: ['#5A6537'], 
        }]
      },
      options: {
        responsive:true,
        maintainAspectRatio:true,
        aspectRatio:1.5
      }
    });
  }
}




 

  