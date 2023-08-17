import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
    // Create a new FormGroup for the forgot password form
    ForgotPasswordForm = new FormGroup({
        // Create a FormControl for the new password field
        Npassword: new FormControl(''),
        // Create a FormControl for the confirm password field
        Cpassword: new FormControl(),
    });
}
