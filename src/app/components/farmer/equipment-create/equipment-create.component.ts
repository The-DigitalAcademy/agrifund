/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Asset } from './../../../models/asset';
import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-equipment-create',
    templateUrl: './equipment-create.component.html',
    styleUrls: ['./equipment-create.component.css'],
})
export class EquipmentCreateComponent implements OnInit {
    asset!: Asset;

  createEquipmentForm!: FormGroup;
  submitted = false;
constructor(private router: Router, private _fb: FormBuilder, private _portfolioServiceService: PortfolioService,private _apiService: ApiService){
  }
  ngOnInit(): void {

    // Create the form group for equipment creation with validators
this.createEquipmentForm = this._fb.group({
  equipmentName: ['', [Validators.required]],
  equipmentType: ['', [Validators.required]],
  equipmentAge: ['', [Validators.required]],
  equipmentAmount: ['', [Validators.required]],
});
  }
// Function to save equipment data
saveEquipment() {
  // Mark the form as submitted
  this.submitted = true;

  // Check if the form data is valid
  if (this.createEquipmentForm.valid) {
    // Create an object representing the equipment data
    this.asset = {
      id: this._portfolioServiceService.generateId(),         // Generate an ID
      farm_id: this._portfolioServiceService.generateFarmId(), // Generate a Farm ID
      name: this.createEquipmentForm.get('equipmentName')?.value,
      type: this.createEquipmentForm.get('equipmentType')?.value,
      age: this.createEquipmentForm.get('equipmentAge')?.value,
      purchase_price: this.createEquipmentForm.get('equipmentAmount')?.value,
    };

    // Log the equipment data to the console as a table
    console.table(this.asset);

    // Call the API service to add equipment data
    this._apiService.addEquipment(this.asset).subscribe(data => {
      // Log the response data to the console as a table
      console.table(data);
    });

    // Navigate to the '/portfolio' route after saving
    this.router.navigate(['/portfolio']);
  }
}

}

