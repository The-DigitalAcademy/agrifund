import { Chart } from 'chart.js/auto';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-donut-graph',
  templateUrl: './donut-graph.component.html',
  styleUrls: ['./donut-graph.component.css']
})
export class DonutGraphComponent {
  constructor() { }

  ngOnInit(): void {
    this.RenderChart();
  }
  RenderChart() {
    new Chart("Piechart", {
      type: 'doughnut',
      data: {
        labels: ['Money Out', 'Money In'],
        datasets: [{
          label: 'Money Out Summary',
          data: [1200, 590],
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