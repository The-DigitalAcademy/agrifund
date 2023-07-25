import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-progressbar',
  templateUrl: './portfolio-progressbar.component.html',
  styleUrls: ['./portfolio-progressbar.component.css']
})
export class PortfolioProgressbarComponent {

  @Input() progress: number = 0;
}
