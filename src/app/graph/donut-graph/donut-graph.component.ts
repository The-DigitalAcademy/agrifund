import { Chart } from 'chart.js/auto';
import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chart/chart.service';

@Component({
  selector: 'app-donut-graph',
  templateUrl: './donut-graph.component.html',
  styleUrls: ['./donut-graph.component.css']
})
export class DonutGraphComponent {
  public chart: any;
  moneyIn: any;
  moneyOut: any;

  
  constructor(private service: ChartService) {}

  createChart(){
    
    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Money In', 'Money Out' ],
	       datasets: [{
    label: 'Money In Money Out',
    data: [70, 30],
    backgroundColor: [
    
      'olive',
			'grey',
      		
    ],
    hoverOffset: 4
  }],
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