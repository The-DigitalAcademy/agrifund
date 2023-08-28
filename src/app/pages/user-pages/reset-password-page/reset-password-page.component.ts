/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 10 Aug 2023 

    DESCRIPTION:
    All the methods related to resetting password

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password-page.component.html',
    styleUrls: ['./reset-password-page.component.css'],
})
export class ResetPasswordPageComponent {
    // Create a new FormGroup for the reset password form
    ResetPasswordForm = new FormGroup({
        // Create a FormControl for the email field
        email: new FormControl(''),
    });
}