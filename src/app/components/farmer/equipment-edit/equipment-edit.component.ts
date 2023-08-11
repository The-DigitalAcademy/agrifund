import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent {
  editEquipmentForm!: FormGroup;
saveEquipment() {
throw new Error('Method not implemented.');
}

}
