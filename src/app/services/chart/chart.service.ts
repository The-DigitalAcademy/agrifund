import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) { }

  Getchartinfo() {
    return this.http.get("http://localhost:3000/total_expense");
    }
    
  
}

