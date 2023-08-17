/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from 'src/app/models/asset';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-equipment-table',
  templateUrl: './equipment-table.component.html',
  styleUrls: ['./equipment-table.component.css']
})
export class EquipmentTableComponent {

  assets: Asset[] = []; // Initializing assets with interfaceAsset
  isLast: any;

  constructor(private _apiService: ApiService, private router: Router) {
   
  }

  ngOnInit() {
    // Fetch all equipment data from the API service
    this._apiService.getAllEquipment().subscribe(
      (data: any) => {
        this.assets = data; // Populate the assets array with retrieved data
      }
    );
  }

  ngOnDestroy() {
    // This perform cleanup when the component is destroyed
  }

  // Handle "Edit" button click
  onEditClicked(id: number) {
    // Navigate to the "equipment-edit" route with the specified ID
    this.router.navigate(['/equipment-edit', id]);
  }
}
