import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // Define a mock token for demonstration purposes
    private mockToken = 'your_mock_token_here';

    constructor() {}

    // Check if the provided token matches the mock token
    isAuthenticated(token: string): boolean {
        // Compare the provided token with the mock token
        return token === this.mockToken;
    }
}
