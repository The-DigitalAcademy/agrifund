import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  storeAuthToken(token: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3001/agrifund/api/v1';

  constructor(private http: HttpClient) {}

  register(userInfo: Users): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, userInfo);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, credentials);
  }
}
