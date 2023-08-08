import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  public chart: any;
  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Water', 'Seed', 'Equipment','Fertilizer',
								 'Tool'], 
	       datasets: [
          {
            label: "Expense",
            data: [2422],
            backgroundColor: 'darkgreen'
          },
          {
            label: "",
            data: [234, 323],
            backgroundColor: '#5A6537)'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  ngOnInit(): void {
    this.createChart();
  }

}

