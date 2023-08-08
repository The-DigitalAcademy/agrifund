import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-My-Custom-Header': `${environment.API_KEY}`,
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private baseUrl = 'https://localhost:3001/agrifund/api/v1';
  private proxyUrl = '';

  constructor(private http: HttpClient) {}

  cryptoData() {
    const url = `${this.proxyUrl}${this.baseUrl}`;
    return this.http.get(url, httpOptions);
  }
}