import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enableform-crop-info',
  templateUrl: './enableform-crop-info.component.html',
  styleUrls: ['./enableform-crop-info.component.css']
})
export class EnableformCropInfoComponent {
  @Output() enableFields = new EventEmitter<void>();
  @Output() saveData = new EventEmitter<any>();
  @Output() cancelData = new EventEmitter<any>();
  myForm!: FormGroup;

  onEditClicked() {
    this.enableFields.emit();
  }


  onSaveClicked() {
    this.saveData.emit(this.myForm.value);
  }

  onCancelClicked() {
    this.cancelData.emit(this.myForm.value);
  } 

}
