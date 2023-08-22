import { Injectable } from '@angular/core';
import { Crop } from 'src/app/models/crop';
import { ApiService } from '../api/api.service';
import { Plot } from 'src/app/models/plot';
import { YouAndFarm } from 'src/app/models/you-and-farm';
import { Equipment } from 'src/app/models/equipment';

@Injectable({
  providedIn: 'root'
})
export class AboutTheFarmService {

  private crops: Crop[] = [];
  private plots: Plot[] = [];
  private farms: YouAndFarm[] = []; 
  private equipments: Equipment[] = []; 

  constructor(private _apiService: ApiService) {

    
   }

   // Method to generate a farm ID based on the length of 'assets' array
  generateFarmId() {
    const farm_id: number = this.crops.length;
    return farm_id;
  }
  generateFarm_Id() {
    const farm_id: number = this.plots.length;
    return farm_id;
  }
  generateFarm_FarmId() {
    const farm_id: number = this.farms.length;
    return farm_id;
  }
  generateFarm_EquipmentId(){
    const farm_id: number = this.equipments.length;
    return farm_id;
  }

}
