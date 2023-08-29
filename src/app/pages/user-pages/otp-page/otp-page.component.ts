/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 29 Aug 2023
    UPDATED DATE: 129 Aug 2023

    DESCRIPTION:
    All the methods related to resetting password

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-otp-page',
    templateUrl: './otp-page.component.html',
    styleUrls: ['./otp-page.component.css'],
})
export class OtpPageComponent {
    OtpForm = new FormGroup({
        otp: new FormControl(''),
    });
}
