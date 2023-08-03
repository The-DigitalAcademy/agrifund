import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';

@Component({
  selector: 'app-feature-disabledform-personal-info',
  templateUrl: './feature-disabledform-personal-info.component.html',
  styleUrls: ['./feature-disabledform-personal-info.component.css']
})
export class DisabledformPersonalInfoComponent implements OnInit {
  

isDisabled: boolean = true;
onCancelClicked() {
throw new Error('Method not implemented.');
}

  myForm!: FormGroup;
  selectedFile: File | null = null; // Initialize as null
  
  editedData: any;
  farmerData: any;
  

  constructor(private fb: FormBuilder, private validationsService: ValidationsServiceService) { }

  ngOnInit() {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phoneNumber: '0607566762'
    };
  
    this.myForm = this.fb.group({
      first_name: new FormControl({ value: userData.first_name, disabled: true }, [Validators.required, this.validationsService.textWithoutNumbersValidator()]), // Set disabled to true to disable the field by default
      last_name: new FormControl({ value: userData.last_name, disabled: true }, [Validators.required, this.validationsService.textWithoutNumbersValidator()]), // Set disabled to true to disable the field by default
      email: new FormControl({ value: userData.email, disabled: true }, [Validators.required, this.validationsService.emailValidator()]),
      cell_number: new FormControl({ value: userData.phoneNumber, disabled: true }, [Validators.required, this.validationsService.phoneNumberValidator()]), // Set disabled to true to disable the field by default
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
      
    }
 
 
  


  //validations

}
