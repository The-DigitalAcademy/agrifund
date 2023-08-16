import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { Observer } from 'rxjs';
import { Users } from 'src/app/models/users';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    users!: Users;
    RegisterForm!: FormGroup;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private router: Router,
        private _apiService: ApiService
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
        this.submitted = true;
        if (this.RegisterForm.valid) {
            this.users = {
                firstName: this.RegisterForm.get('first_name')?.value,
                lastName: this.RegisterForm.get('last_name')?.value,
                email: this.RegisterForm.get('email')?.value,
                cellNumber: this.RegisterForm.get('cell_number')?.value,
                password: this.RegisterForm.get('password')?.value,
                idNumber: this.RegisterForm.get('id_number')?.value,
            };

            this._apiService.RegisterUser(this.users).subscribe(data => {
                // Handle success or error response from the API
                this.router.navigate(['/login']);
                alert('Successfully Registered');
            });
        }
    }
}
