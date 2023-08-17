import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

private mockToken = 'your_mock_token_here';

  constructor() {}

  isAuthenticated(token: string): boolean {
    return token === this.mockToken;
  }
}
  


