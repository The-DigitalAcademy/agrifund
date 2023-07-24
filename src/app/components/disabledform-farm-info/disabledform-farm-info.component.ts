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
      locationOfFarm: 'John',
      sizeOfFarm: 'Doe',
      yearsUsingFarm: 'john@example.com',
      numberOfPeople: '123-456-7890',
      reasonForFunding:'To help me improve my farming business'
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