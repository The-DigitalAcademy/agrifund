import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-disabledform-crop-info',
  templateUrl: './disabledform-crop-info.component.html',
  styleUrls: ['./disabledform-crop-info.component.css']
})
export class DisabledformCropInfoComponent implements OnInit {

  myForm!: FormGroup;
  isDisabled: boolean = true;
  editedData: any = null;

  cropOptions: string[] = ['Corn', 'Tomatoes', 'Potatoes', 'Carrots', 'Lettuce'];
  farmerData = { // Replace this with the actual farmer data
    seasonFarm: 'Spring',
    selectedCrops: ['Corn', 'Tomatoes'], // Selected crops as an array
    seedsAmount: '50'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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

  getSelectedCropsAsString() {
    const selectedCrops = this.myForm.get('selectedCrops')?.value as string[];
    return selectedCrops.join(', ');
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
