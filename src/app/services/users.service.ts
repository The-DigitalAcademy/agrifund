/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 17 Aug 2023 

    DESCRIPTION:
     This service is for all methods related to API 

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    getAuthenticatedUser() {
        throw new Error('Method not implemented.');
    }
    // Define a mock token for demonstration purposes
    private mockToken = 'your_mock_token_here';

    constructor() {}

    // Check if the provided token matches the mock token
    isAuthenticated(token: string): boolean {
        // Compare the provided token with the mock token
        return token === this.mockToken;
    }
}
