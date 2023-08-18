import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service'; // Importing ApiService
import { Asset } from 'src/app/models/asset'; // Importing Asset model

@Injectable({
    providedIn: 'root',
})
export class PortfolioServiceService {
  
  private assets: Asset[] = []; // Private property to store asset data
  constructor(private _http: HttpClient, private _apiService: ApiService) { 
    // Constructor initializes the service with HttpClient and ApiService

    // Fetch equipment data from the API using ApiService
    this._apiService.getAllEquipment().subscribe((data: any) => {
      this.assets = data; // Assign fetched data to the 'assets' property
    });
  }

  // Method to generate an ID based on the length of 'assets' array
  generateId() {
    const id: number = this.assets.length;
    return id;
  }

  // Method to generate a farm ID based on the length of 'assets' array
  generateFarmId() {
    const farm_id: number = this.assets.length;
    return farm_id;
  }
}
