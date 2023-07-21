import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-portfolio-progressbar',
  templateUrl: './portfolio-progressbar.component.html',
  styleUrls: ['./portfolio-progressbar.component.css']
})
export class PortfolioProgressbarComponent {

  
  checklistForm!: FormGroup;
}
