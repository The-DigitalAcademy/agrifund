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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Sample data for the form fields (you can replace this with your own data)
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '123-456-7890'
    };

    // Create the form controls with the provided data and set them as disabled
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
}
