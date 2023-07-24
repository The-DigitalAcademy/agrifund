import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feature-disabledform-personal-info',
  templateUrl: './feature-disabledform-personal-info.component.html',
  styleUrls: ['./feature-disabledform-personal-info.component.css']
})
export class DisabledformPersonalInfoComponent implements OnInit {

  myForm!: FormGroup;
  selectedFile: File | null = null; // Initialize as null
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
      firstName: new FormControl({ value: userData.firstName, disabled: true }),
      lastName: new FormControl({ value: userData.lastName, disabled: true }),
      email: new FormControl({ value: userData.email, disabled: true }),
      phoneNumber: new FormControl({ value: userData.phoneNumber, disabled: true }),
      proofOfID: new FormControl(null) // Initialize the "proofOfID" control with null
    });
  }
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File; // Store the selected file
  }

  enableFields() {
    this.isDisabled = false; // Enable the fields by setting isDisabled to false
    this.myForm.enable(); // Enable the formGroup
  }
}
