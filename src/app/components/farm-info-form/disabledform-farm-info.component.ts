import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-disabledform-farm-info',
  templateUrl: './disabledform-farm-info.component.html',
  styleUrls: ['./disabledform-farm-info.component.css']
})
export class DisabledformFarmInfoComponent {

  myForm!: FormGroup;
  isDisabled: boolean = true; 
  editedData: any;
  farmerData: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const userData = {
      locationOfFarm: 'Farm Location', // Update with default values
      sizeOfFarm: 'Farm Size', // Update with default values
      yearsUsingFarm: 'Years Using Farm', // Update with default values
      numberOfPeople: 'Number of People', // Update with default values
      reasonForFunding: 'Reason for Funding' // Update with default values
    };
  
    this.myForm = this.fb.group({
      locationOfFarm: new FormControl({ value: userData.locationOfFarm, disabled: true }),
      sizeOfFarm: new FormControl({ value: userData.sizeOfFarm, disabled: true }),
      yearsUsingFarm: new FormControl({ value: userData.yearsUsingFarm, disabled: true }),
      numberOfPeople: new FormControl({ value: userData.numberOfPeople, disabled: true }),
      reasonForFunding: new FormControl({ value: userData.reasonForFunding, disabled: true })
    });
  }
  
  enableFields() {
    this.isDisabled = false; // Enable the fields by setting isDisabled to false
    this.myForm.enable(); // Enable the formGroup
  }

  saveFields() {
    this.editedData = this.myForm.value; 
    this.isDisabled = true; 
  }

  onSaveClicked(formData: any) {
    this.farmerData = formData;
    this.isDisabled = true;
    this.myForm.disable();
  }

}