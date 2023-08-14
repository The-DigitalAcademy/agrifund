import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    RegisterForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService
    ) {}

    ngOnInit(): void {
        this.RegisterForm = this.fb.group(
            {
                first_name: new FormControl('', [
                    Validators.required,
                    this.validationsService.textWithoutNumbersValidator(),
                ]),
                last_name: new FormControl('', [
                    Validators.required,
                    this.validationsService.textWithoutNumbersValidator(),
                ]),
                id_number: new FormControl('', [
                    Validators.required,
                    this.validationsService.idNumberValidator(),
                ]),
               email: new FormControl('', [
                    Validators.required,
                    this.validationsService.emailValidator(),
                ]),
                cell_number: new FormControl('', [
                    Validators.required,
                    this.validationsService.phoneNumberValidator(),
                ]),
                password: new FormControl('', [
                    Validators.required,
                    this.validationsService.passwordValidator(),
                ]),
                cpassword: ['', [Validators.required]],
            },
            {
                validators: [this.validationsService.passwordsMatchValidator], // Add custom password matching validation method from your validation service
            }
        );
    }
    onSubmit() {
        if (this.RegisterForm.valid) {
            // Process the form data here (e.g., call a service to register the user)
        } else {
            // Display an error message or handle invalid form submission
        }
    }
}
