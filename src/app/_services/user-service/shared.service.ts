import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
   
    
    constructor(private apiService: ApiService) {}

    changeFarmerPassword(email: string, passwordResetBody: any) {
        return this.apiService.changeFarmerPassword(email, passwordResetBody);
    }
}