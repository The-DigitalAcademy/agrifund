import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api-service/api.service';
/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 10 Aug 2023 

    DESCRIPTION:
    All the methods related to resetting password

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password-page.component.html',
    styleUrls: ['./reset-password-page.component.css'],
})
export class ResetPasswordPageComponent {
    ResetPasswordForm = new FormGroup({
        email: new FormControl(''),
    });
    @Output() emailSubmitted = new EventEmitter<string>(); // Emit email value to parent component
    constructor(
        private _apiService: ApiService,
        private router: Router
    ) {} // Inject the OTP service

    onSubmit() {
        const email = this.ResetPasswordForm.value.email ?? '';

        this._apiService.getFarmerOTP(email).subscribe(
            response => {
                console.log('OTP request successful');
                this.router.navigate(['/otp-page']);
                // Emit the email value to parent component
                this.emailSubmitted.emit(email);
                // Display a success message to the user or navigate to a confirmation page
                
            },
            error => {
                console.error('OTP request failed', error);
                // Display an error message to the user
            }
        );
    }
}
