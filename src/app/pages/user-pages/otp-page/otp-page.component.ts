import { Router } from '@angular/router';
/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 29 Aug 2023
    UPDATED DATE: 129 Aug 2023

    DESCRIPTION:
    All the methods related to resetting password

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ApiService } from 'src/app/_services/api-service/api.service';

@Component({
    selector: 'app-otp-page',
    templateUrl: './otp-page.component.html',
    styleUrls: ['./otp-page.component.css'],
})
export class OtpPageComponent {
    @Input() emailValue!: string; // Receive email value from parent component
    OtpForm = new FormGroup({
        otp: new FormControl(''),
        Npassword: new FormControl(''),
        Cpassword: new FormControl(),
    });
    constructor(
        private _apiService: ApiService,
        private router: Router
    ) {}

    submitOtp() {
        const otp = this.OtpForm.value.otp;

        // Assuming you have a passwordResetBody to send along with the OTP
        const passwordResetBody = { otp, email: this.emailValue };

        this._apiService
            .changeFarmerPassword(this.emailValue, passwordResetBody)
            .subscribe(
                response => {
                    console.log('Password reset successful');
                    // Handle success, e.g., navigate to a success page
                },
                error => {
                    console.error('Password reset failed', error);
                    // Handle error, e.g., display an error message to the user
                    this.router.navigate(['/forgot-password']);
                }
            );
    }
}

