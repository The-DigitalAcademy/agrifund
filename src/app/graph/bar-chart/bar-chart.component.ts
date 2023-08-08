import { Component } from '@angular/core';
import Chart from 'chart.js/auto';


const apiUrl = 'http://localhost:3001/agrifund/api/v1';
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
      

      // values on X-Axis

      data: {
        labels: ['Water', 'Seed', 'Equipment','Fertilizer',
								 'Tool'], 
	       datasets: [
        
          {
            label: "Money Out Summary",
            data: [700, 900,320,550, 1200],
            backgroundColor: 'olive',
            
            
            
          }  
        ]
      },
      options: {
        aspectRatio:2.9
      }
      
    });
  }
  ngOnInit(): void {
    this.createChart();
  }

}

