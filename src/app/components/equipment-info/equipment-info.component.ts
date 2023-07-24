import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-equipment-info',
  templateUrl: './equipment-info.component.html',
  styleUrls: ['./equipment-info.component.css']
})
export class EquipmentInfoComponent {
  isDisabled!: boolean;
  myForm!: FormGroup;

  enableFields() {
    this.isDisabled = false; // Enable the fields by setting isDisabled to false
    this.myForm.enable(); // Enable the formGroup
  }


}
