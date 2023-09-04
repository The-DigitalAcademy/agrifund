/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 10 Aug 2023 

    DESCRIPTION:
    All the methods related to forgot password

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/_services/api-service/api.service';


@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.css'],
})
export class ForgotPasswordPageComponent {
    // Create a new FormGroup for the forgot password form
    @Input() userEmail!: string;

    ForgotPasswordForm = new FormGroup({
        Npassword: new FormControl(''),
        Cpassword: new FormControl(),
    });

    constructor(private apiService: ApiService) {}

    resetPassword() {
        const passwordResetBody = {
            // Construct your password reset body here
        };

        // Call the API to reset password using this.userEmail and passwordResetBody
        this.apiService
            .changeFarmerPassword(this.userEmail, passwordResetBody)
            .subscribe(
                response => {
                    // Handle response
                },
                error => {
                    // Handle error
                }
            );
    }
}