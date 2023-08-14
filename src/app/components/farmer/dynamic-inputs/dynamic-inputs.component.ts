import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-inputs',
  templateUrl: './dynamic-inputs.component.html',
  styleUrls: ['./dynamic-inputs.component.css']
})
export class DynamicInputsComponent {

  inputFields: any[] = [];

  addInputRow() {
    const newRow = { field1: '', field2: '', field3: '', field4: '', field5: '' };
    this.inputFields.push(newRow);
  }

  removeInputRow(index: number) {
    this.inputFields.splice(index, 1);
  }

}
