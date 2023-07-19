import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-disabledform-crop-info',
  templateUrl: './disabledform-crop-info.component.html',
  styleUrls: ['./disabledform-crop-info.component.css']
})
export class DisabledformCropInfoComponent {

  myForm!: FormGroup;
  isDisabled: boolean = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const userData = {
      seasonFarm: 'Spring',
      crops: ['Corn', 'Tomatoes'],
      seedAmount: '50'
    };
  
    this.myForm = this.fb.group({
      seasonFarm: new FormControl({ value: userData.seasonFarm, disabled: true }),
      crops: new FormControl({ value: userData.crops, disabled: true }),
      seedAmount: new FormControl({ value: userData.seedAmount, disabled: true })
    });
  }

  enableFields() {
    this.isDisabled = false;
    this.myForm.enable();
  }

}
