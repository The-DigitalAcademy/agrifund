import { ProgressService } from 'src/app/services/progress.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';

@Component({
  selector: 'app-feature-disabledform-personal-info',
  templateUrl: './feature-disabledform-personal-info.component.html',
  styleUrls: ['./feature-disabledform-personal-info.component.css']
})
export class DisabledformPersonalInfoComponent implements OnInit {
  



  myForm!: FormGroup;
  selectedFile: File | null = null; // Initialize as null
  
  editedData: any;
  farmerData: any;
  isDisabled: boolean = true;
  originalFormValues: any;
 
  

  constructor(private fb: FormBuilder, private validationsService: ValidationsServiceService, private progressService: ProgressService) { }

  ngOnInit() {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '0607566762'
    };
  
    this.myForm = this.fb.group({
      firstName: new FormControl({ value: userData.firstName, disabled: true }, [Validators.required, this.validationsService.textWithoutNumbersValidator()]), // Set disabled to true to disable the field by default
      lastName: new FormControl({ value: userData.lastName, disabled: true }, [Validators.required, this.validationsService.textWithoutNumbersValidator()]), // Set disabled to true to disable the field by default
      email: new FormControl({ value: userData.email, disabled: true }, [Validators.required, this.validationsService.emailValidator()]),
      phoneNumber: new FormControl({ value: userData.phoneNumber, disabled: true }, [Validators.required, this.validationsService.phoneNumberValidator()]), // Set disabled to true to disable the field by default
      proofOfID: new FormControl(null) // Initialize the "proofOfID" control with null
    });
    
    // Save the initial form values
  this.originalFormValues = userData;
  
    
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File; // Store the selected file
    
   
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
      // Set personal info completion status to true
    this.progressService.setPersonalInfoCompleted(true);
     
      
    }
 
 
    onCancelClicked() {

    // Reset the form values to the original values
  this.myForm.patchValue(this.originalFormValues);
  
  // Disable the form fields again
  this.isDisabled = true;
  this.myForm.disable();
    }


  //validations

}
