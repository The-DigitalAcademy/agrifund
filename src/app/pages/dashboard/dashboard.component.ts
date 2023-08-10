import { Component } from '@angular/core';
import { ChartService } from 'src/app/services/chart/chart.service';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  total_income!: number;
  total_expenses!: number;
  title!: 'ng-chart';
  result: Object | undefined;

  constructor(private service: ChartService) {}

  ngOnInit() {
    this.service.cryptoData().then((res) => {
      this.result = res
      console.log(this.result)
  })
}

}
