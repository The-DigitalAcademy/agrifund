import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
    // Create a new FormGroup for the reset password form
    ResetPasswordForm = new FormGroup({
        // Create a FormControl for the email field
        email: new FormControl(''),
    });
}
