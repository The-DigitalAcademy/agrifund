import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { UserService } from 'src/app/services/users.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    LoginForm!: FormGroup;
    message = '';
    apiURL = 'http://agrifund.tech:8080/api/v1/auth/farmer';

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private router: Router,
        private userService: UserService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.LoginForm = this.fb.group({
            email: [
                '',
                [Validators.required, this.validationsService.emailValidator()],
            ],
            password: [
                '',
                [
                    Validators.required,
                    this.validationsService.passwordValidator(),
                ],
            ],
        });
    }

    onSubmit() {
        if (this.LoginForm.valid) {
            const formValue = this.LoginForm.value;
            this.http.post(`${this.apiURL}/login`, formValue).subscribe(
                (response: any) => {
                    console.log(response);
                    localStorage.setItem('token', response.token);

                    if (this.userService.isAuthenticated(response.token)) {
                        this.router.navigate(['/dashboard']);
                        alert('Authentication successful');
                    } else {
                        // Handle non-authenticated scenario, for example:
                        localStorage.removeItem('token');
                        alert('Authentication failed');
                    }
                },
                (error: HttpErrorResponse) => {
                    this.message = 'Wrong username or password';
                }
            );
        }
    }
}
