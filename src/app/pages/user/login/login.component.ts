import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    LoginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService
    ) {}

    ngOnInit(): void {
        this.LoginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                this.validationsService.emailValidator(),
            ]),
            password: new FormControl('', [
                Validators.required,
                this.validationsService.passwordValidator(),
            ]),
        });
    }
    onSubmit() {
        if (this.LoginForm.valid) {
            // Process the form data here (e.g., call a service to register the user)
        } else {
            // Display an error message or handle invalid form submission
        }
    }
}
