import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
RegisterForm = new FormGroup({
name: new FormControl(''),
surname: new FormControl(''),
id: new FormControl(''),
cellNo: new FormControl(''),
password:new FormControl(''),
Cpassword: new FormControl('')
})
}
                              