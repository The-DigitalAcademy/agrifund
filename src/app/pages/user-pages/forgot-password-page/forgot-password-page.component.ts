/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 10 Aug 2023 

    DESCRIPTION:
    All the methods related to forgot password

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.css'],
})
export class ForgotPasswordPageComponent {
    // Create a new FormGroup for the forgot password form
    ForgotPasswordForm = new FormGroup({
        // Create a FormControl for the new password field
        Npassword: new FormControl(''),
        // Create a FormControl for the confirm password field
        Cpassword: new FormControl(),
    });
}
