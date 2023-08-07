import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Asset } from 'src/app/models/asset';


@Injectable({
  providedIn: 'root'
})
export class PortfolioServiceService {

  constructor(private _http: HttpClient, private _apiService: ApiService) { }

  private equipmentRecords: Asset[] = [];

  generateId() {
    const id: number = this.equipmentRecords.length;

    return id;
}
 
}
