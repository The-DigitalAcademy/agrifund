import { Injectable } from '@angular/core';
import { Crop } from 'src/app/models/crop';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AboutTheFarmService {

  private crops: Crop[] = [];  

  constructor(private _apiService: ApiService) {

    
   }

   // Method to generate a farm ID based on the length of 'assets' array
  generateFarmId() {
    const farm_id: number = this.crops.length;
    return farm_id;
  }
}
