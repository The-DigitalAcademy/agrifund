import { Injectable } from '@angular/core';
import { Crop } from 'src/app/_models/crop';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { Plot } from 'src/app/_models/plot';
import { YouAndFarm } from 'src/app/_models/you-and-farm';


@Injectable({
  providedIn: 'root'
})
export class AboutTheFarmService {

  private crops: Crop[] = [];
  private plots: Plot[] = [];
  private farms: YouAndFarm[] = []; 
  

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
  

}
