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
 
  constructor() { }

  ngOnInit(): void {
    this.RenderChart();
  }
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


 

  