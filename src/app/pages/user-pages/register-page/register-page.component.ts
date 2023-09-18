import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { User } from 'src/app/_models/User';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { Subscription } from 'rxjs';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { RegisterService } from 'src/app/_services/user-service/register-service/register.service';

// Import SweetAlert
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
    user!: User;
    RegisterForm!: FormGroup;
    submitted = false;
    showPassword = false;
    showConfirmPassword = false;
    // used to store subscriptions to services
    private subscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private _validationsService: ValidationService,
        private router: Router,
        private registerService: RegisterService // Inject the new service
    ) {}

    ngOnInit(): void {
        // Initialize the registration form with validation rules
        this.RegisterForm = this.fb.group({
            first_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            last_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            id_number: new FormControl('', [
                Validators.required,
                this._validationsService.idNumberValidator(),
            ]),
            email: new FormControl('', [
                Validators.required,
                this._validationsService.emailValidator(),
            ]),
            cell_number: new FormControl('', [
                Validators.required,
                this._validationsService.phoneNumberValidator(),
            ]),
            password: new FormControl('', [
                Validators.required,
                this._validationsService.passwordValidator(),
            ]),
            cpassword: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.RegisterForm.valid) {
            const inputValue = this.RegisterForm.value;
            // Gather user data from the form
            this.user = {
                id: 0,
                firstName: inputValue.first_name,
                lastName: inputValue.last_name,
                email: inputValue.email,
                cellNumber: inputValue.cell_number,
                password: inputValue.password,
                idNumber: inputValue.id_number,
            };

            // Call the registration service to register the user
            this.subscription.add(
                this.registerService
                    .registerUser(this.user)
                    .subscribe((data: any) => {
                        console.log(data);

                        // Display a success message using SweetAlert
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful',
                            text: 'You have successfully registered!',
                        }).then(() => {
                            this.router.navigate(['/login']);
                        });
                    })
            );
        }
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
}
