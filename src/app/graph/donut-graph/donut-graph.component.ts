import { Chart,registerables } from 'chart.js/auto';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chart/chart.service';
import { ApiService } from 'src/app/services/api/api.service';


Chart.register(...registerables);
@Component({
  selector: 'app-donut-graph',
  templateUrl: './donut-graph.component.html',
  styleUrls: ['./donut-graph.component.css']
})
export class DonutGraphComponent {
  constructor(private chartService:ChartService) { }

  // chartdata: any;
  // result:any;
  total_expense: any = [];
  total_income: any = [];
  net_income: any = [];

  // result: any;
  // realdata: any[] =[];
  // labeldata: any[] =[];

  ngOnInit(): void {

    this.chartService.Getchartinfo().subscribe(result =>{
      this.total_expense = result;
      // this.total_expense = this.result.data.amount.map((amount: any) => amount.expense);
      console.log(this.total_expense)
    });
  
    // this.RenderChart(this.total_expense);
    this.RenderChart();
    
  }
  // RenderChart(total_expense:any) 
  RenderChart() {
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
      options: {
        aspectRatio:2.0
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