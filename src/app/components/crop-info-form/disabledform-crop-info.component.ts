import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-disabledform-crop-info',
  templateUrl: './disabledform-crop-info.component.html',
  styleUrls: ['./disabledform-crop-info.component.css']
})
export class DisabledformCropInfoComponent implements OnInit {
  farmerData: any;
 
onCancelClicked() {
throw new Error('Method not implemented.');
}


  myForm!: FormGroup;
  isDisabled: boolean = true;
  editedData: any = null;

  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.farmerData = { // Replace this with the actual farmer data
      seasonFarm: 'Spring',
      selectedCrops: 'Maize', // Selected crops as an array
      seedsAmount: '50'
    };

    this.myForm = this.fb.group({
      seasonFarm: new FormControl({ value: this.farmerData.seasonFarm, disabled: true }),
      selectedCrops: new FormControl({ value: this.farmerData.selectedCrops, disabled: true }),
      seedsAmount: new FormControl({ value: this.farmerData.seedsAmount, disabled: true })
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

    
}
