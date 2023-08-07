import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.css']
})
export class EquipmentCreateComponent implements OnInit {

  createEquipmentForm!: FormGroup;
constructor(private router: Router, private _fb: FormBuilder){
  }
  ngOnInit(): void {

    this.createEquipmentForm = this._fb.group({
      equipmentName: ['', [Validators.required]],
      equipmentType:['', [Validators.required]],
      equipmentQuantity:['', [Validators.required]],
      equipmentAge:['', [Validators.required]],
      equipmentAmount:['', [Validators.required]],
    });
    
  }

  
saveEquipment() {
  throw new Error('Method not implemented.');
  }
}
