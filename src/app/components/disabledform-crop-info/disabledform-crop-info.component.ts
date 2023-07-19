import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-disabledform-crop-info',
  templateUrl: './disabledform-crop-info.component.html',
  styleUrls: ['./disabledform-crop-info.component.css']
})
export class DisabledformCropInfoComponent implements OnInit {

  myForm!: FormGroup;
  isDisabled: boolean = true;

  cropOptions: string[] = ['Corn', 'Tomatoes', 'Potatoes', 'Carrots', 'Lettuce'];
  farmerData = { // Replace this with the actual farmer data
    seasonFarm: 'Spring',
    crops: ['Corn', 'Tomatoes'],
    seedsAmount: '50'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      seasonFarm: new FormControl({ value: this.farmerData.seasonFarm, disabled: true }),
      selectedCrops: new FormControl({ value: this.farmerData.crops, disabled: true }),
      seedsAmount: new FormControl({ value: this.farmerData.seedsAmount, disabled: true })
    });
  }

  enableFields() {
    this.isDisabled = false;
    this.myForm.enable();
  }

  getSelectedCropsAsString() {
    const selectedCropsArray = this.myForm.get('selectedCrops') as FormArray;
    const selectedCrops = selectedCropsArray.value;
    return selectedCrops.join(', ');
  }
}
