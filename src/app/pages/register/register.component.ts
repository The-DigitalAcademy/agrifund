// import { Component } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { FormGroup } from '@angular/forms';
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
// RegisterForm = new FormGroup({
// name: new FormControl(''),
// surname: new FormControl(''),
// id: new FormControl(''),
// cellNo: new FormControl(''),
// password:new FormControl(''),
// Cpassword: new FormControl('')
// })
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationsServiceService
  ) { }

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      id: ['', Validators.required, this.validationService.validateIDno],
      cellNo: ['', Validators.required, this.validationService.validatePhoneNumber], // Add custom cell number validation method from your validation service
      password: ['', [Validators.required, Validators.minLength(8)]],
      Cpassword: ['', Validators.required],
    }, {
      validators: [this.validationService.validatePassword] // Add custom password matching validation method from your validation service
    });
  }

  // Add the method to handle form submission
  onSubmit() {
    if (this.RegisterForm.valid) {
      // Process the form data here (e.g., call a service to register the user)
    } else {
      // Display an error message or handle invalid form submission
    }
  }
}

                              