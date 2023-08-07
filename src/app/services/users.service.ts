import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  private baseUrl = 'http://localhost:3001/agrifund/api/v1';
    /* --------------------------------
        USER CONNECTION STRINGS
    ---------------------------------*/
    private userURL = this.baseUrl + '/users';

  constructor(private http: HttpClient) {}

  RegisterUser(inputdata:any){
    return this.http.post(`${this.userURL}`, inputdata);

  }
  GetUser(data:any){
    return this.http.get(`${this.userURL}`, data);

  }

  }


