import { Asset } from './../../../models/asset';
import { PortfolioServiceService } from './../../../services/portfolio/portfolio-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.css']
})
export class EquipmentCreateComponent implements OnInit {

  asset!: Asset;

  createEquipmentForm!: FormGroup;
  submitted = false;
constructor(private router: Router, private _fb: FormBuilder, private _portfolioServiceService: PortfolioServiceService,private _apiService: ApiService){
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

  
  //test if the the data filled in the form is valid
  //also check if the data can display on the console
saveEquipment() {
  this.submitted = true;
  if(this.createEquipmentForm.valid) {
    this.asset = {
      farm_id: this._portfolioServiceService.generateId(),
      name: this.createEquipmentForm.get('equipmentName')?.value,
      type: this.createEquipmentForm.get('equipmentType')?.value,
      age: this.createEquipmentForm.get('equipmentAge')?.value,
      purchase_price: this.createEquipmentForm.get('equipmentAmount')?.value,
    };

    console.table(this.asset);
    this._apiService.addEquipment(this.asset).subscribe(data => {
      console.log(data);
      console.table(this.createEquipmentForm.value)
      alert()

    });

    this.router.navigate(['/portfolio-view-info'])
  }
}
}
