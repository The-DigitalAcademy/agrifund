import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  LoginForm!: FormGroup; 

  constructor(private fb:FormBuilder, private validationsService: ValidationsServiceService, private service:UserService, private router:Router ) {}

ngOnInit(): void {

  this.LoginForm = new FormGroup({
    id_number: new FormControl("",[Validators.required, this.validationsService.idNumberValidator()]),
    password:new FormControl("", [Validators.required, this.validationsService.passwordValidator()]),

 

    
})
}
onSubmit() {
  if (this.LoginForm.valid) {
    this.service.RegisterUser(this.LoginForm.value).subscribe();{
      this.router.navigate(['login'])
    }
    // Process the form data here (e.g., call a service to register the user)
  } else {
    // Display an error message or handle invalid form submission
  }
}
}


