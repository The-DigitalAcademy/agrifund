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

  equipmentRecords: Asset[] = [];
  constructor(private _apiService: ApiService, private router: Router){
    }

  ngOnInit() {
    this._apiService.getAllEquipment().subscribe(
      (assets: any) => {
         this.equipmentRecords = assets;
      });
  }

ngOnDestroy() {};

  
  onEditClicked() {
    throw new Error('Method not implemented.');
    }
}
