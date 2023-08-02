import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';

@Component({
  selector: 'app-feature-disabledform-personal-info',
  templateUrl: './feature-disabledform-personal-info.component.html',
  styleUrls: ['./feature-disabledform-personal-info.component.css']
})
export class DisabledformPersonalInfoComponent implements OnInit {
personalInfoProgress: number=0;

onCancelClicked() {
throw new Error('Method not implemented.');
}

  myForm!: FormGroup;
  selectedFile: File | null = null; // Initialize as null
  isDisabled: boolean = true; // Set to true to disable the form by default
  editedData: any;
  farmerData: any;
  

  constructor(private fb: FormBuilder, private validationsService: ValidationsServiceService) { }

  ngOnInit() {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '0607566762'
    };
  
    this.myForm = this.fb.group({
      firstName: new FormControl({ value: userData.firstName, disabled: true }), // Set disabled to true to disable the field by default
      lastName: new FormControl({ value: userData.lastName, disabled: true }), // Set disabled to true to disable the field by default
      email: new FormControl({ value: userData.email, disabled: true }, [Validators.required, this.validationsService.emailValidator()]),
      phoneNumber: new FormControl({ value: userData.phoneNumber, disabled: true }), // Set disabled to true to disable the field by default
      proofOfID: new FormControl(null) // Initialize the "proofOfID" control with null
    });
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File; // Store the selected file
    this.myForm.get('proofOfID')?.setValue(File);
   
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
      this.calculateProgress();
    }
  // Method to calculate the progress percentage for the form
  calculateProgress() {
    const formControls = this.myForm.controls;
    const totalFields = Object.keys(formControls).length;
    let filledFields = 0;

    for (const control in formControls) {
      if (formControls[control].value) {
        filledFields++;
      }
    }

    this.personalInfoProgress = (filledFields / totalFields) * 100;
  }



  //validations

}
