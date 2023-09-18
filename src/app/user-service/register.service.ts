import { Injectable } from '@angular/core';
import { ApiService } from '../_services/api-service/api.service';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(private _apiService: ApiService) {}
    registerUser(user: User): Observable<any> {
        // Call the API service to register the user
        return this._apiService.registerUser(user);
    }
}
