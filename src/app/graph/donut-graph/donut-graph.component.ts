// AUTHOR: Bolebo
//     CREATE DATE: 08 AUG 2023
//     UPDATED DATE: 21 Aug 2023 

//     DESCRIPTION:
//     I INJECTED A SERVICE "CHARTSERVICE" TO FETCH DATA FROM THE API AND METHODS TO FETCH CHART INFO FROM THE MOCK API TO DISPLAY DATA. ADDED A METHOD TO RENDER CHART INFO
//     RenderChart -> A METHOD TO RENDER CHART INFO FROM THE MOCK API


import { Chart,registerables } from 'chart.js/auto';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chart/chart.service';



Chart.register(...registerables);
@Component({
  selector: 'app-donut-graph',
  templateUrl: './donut-graph.component.html',
  styleUrls: ['./donut-graph.component.css']
})
export class DonutGraphComponent {
  constructor(private chartService:ChartService) { }

  total_expense: any = [];
  total_income: any = [];
  net_income: any = [];
  amount:any = [];
  results:any = [];


  ngOnInit(): void {

    this.chartService.getTotalNetIncome().subscribe(result =>{
      this.net_income = result;
  
      
      console.log(this.net_income)
    });

    this.chartService.getTotalIncome().subscribe(result =>{
      this.total_income = result;

      console.log(this.total_income)
    });
  
    // this.RenderChart(this.total_expense);
    this.RenderChart(this.net_income,this.net_income);
    
  }
  // RenderChart(total_expense:any) 

  // doughnut graph properties

  RenderChart(total_income:any,net_income:any) {
    new Chart("Piechart", {
      type: 'doughnut',
      data: {
        labels: ['Money Out', 'Money In'],
        datasets: [{
          label: 'Money Out Summary',
          data: [378,882],
          backgroundColor: ['#5A6537',
          '#9BA66F'],
          hoverOffset: 10
        }]
        
      },
      // size of the graph properties
      options: {
        responsive:true,
        maintainAspectRatio:true,
        aspectRatio:1.7
      }
    });
  }
}

