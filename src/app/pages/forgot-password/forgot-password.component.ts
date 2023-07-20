import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
 ForgotPasswordForm = new FormGroup({
  Npassword : new FormControl(''),
  Cpassword : new FormControl

 }) 

}
