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
  

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '123-456-7890'
    };
  
    this.myForm = this.fb.group({
      locationOfFarm: new FormControl({ value: '', disabled: true }),
      sizeOfFarm: new FormControl({ value: '', disabled: true }),
      yearsUsingFarm: new FormControl({ value: '', disabled: true }),
      numberOfPeople: new FormControl({ value: '', disabled: true }),
      reasonForFunding: new FormControl({ value: '', disabled: true })
    });
  }
  
  

  enableFields() {
    this.isDisabled = false; // Enable the fields by setting isDisabled to false
    this.myForm.enable(); // Enable the formGroup
  }
}