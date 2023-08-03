import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';

@Component({
  selector: 'app-disabledform-crop-info',
  templateUrl: './disabledform-crop-info.component.html',
  styleUrls: ['./disabledform-crop-info.component.css']
})
export class DisabledformCropInfoComponent implements OnInit {
  
 // Input to receive crop info progress
  
  farmerData: any;
  myForm!: FormGroup;
  isDisabled: boolean = true;
  editedData: any = null;
 

  constructor(private fb: FormBuilder, private validationsService: ValidationsServiceService) { }

  ngOnInit() {
    this.farmerData = { // Replace this with the actual farmer data
      seasonFarm: 'Spring',
      crop_name: 'Potatoes', // Selected crops as an array
      seedsAmount: '70'
    };

    this.myForm = this.fb.group({
      seasonFarm: new FormControl({ value: this.farmerData.seasonFarm, disabled: true }),
      crop_name: new FormControl({ value: this.farmerData.crop_name, disabled: true }, [Validators.required, this.validationsService.textWithoutNumbersValidator()]),
      seedsAmount: new FormControl({ value: this.farmerData.seedsAmount, disabled: true },[Validators.required, this.validationsService.isNumericValidator()]),
      cropsInfo: new FormControl({ value: this.farmerData.selectedCrops, disabled: true }) // Include the cropsInfo field
    });
  }

  enableFields() {
    this.isDisabled = false;
    this.myForm.enable();
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

  onCancelClicked() {
    // Implement your cancel logic here
  }

  
}
