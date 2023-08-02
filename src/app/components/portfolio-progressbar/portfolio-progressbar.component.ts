import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-portfolio-progressbar',
  templateUrl: './portfolio-progressbar.component.html',
  styleUrls: ['./portfolio-progressbar.component.css']
})
export class PortfolioProgressbarComponent {

  @Input() progressPercentage: number = 0;
  checklistForm!: FormGroup;



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Create the form controls and form group for the checklistForm
    this.checklistForm = this.fb.group({
      personalInfo: new FormControl({ value: false, disabled: true }), // Set disabled to true to disable the checkbox by default
      farmInfo: new FormControl({ value: false, disabled: true }), // Set disabled to true to disable the checkbox by default
      cropInfo: new FormControl({ value: false, disabled: true }), // Set disabled to true to disable the checkbox by default
    });
  }

  // Other methods and code for your component...
}
