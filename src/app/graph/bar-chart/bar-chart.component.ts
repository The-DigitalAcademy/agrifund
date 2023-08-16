import { Component,OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart/chart.service';


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
        aspectRatio:1.9
      }
    });
  }
}

// this.service.getAllStatementItems().subscribe(result=>{
  //   this.chartdata = result;
  //   if(this.chartdata!=null){
  //     for(let i=0; this.chartdata.length ;i++){

  //       this.total_expenses.push(this.chartdata[i].expense);
  //       this.total_income.push(this.chartdata[i].income);
  //       this.net_income.push(this.chartdata[i].profit);
  //     }
  //     this.RenderChart(this.total_expenses, this.net_income, this.total_income);
  //   }
    


  // });


 

  