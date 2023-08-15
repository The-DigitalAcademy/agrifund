import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api/api.service';
import { ValidationsServiceService } from 'src/app/services/validation/validations-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    LoginForm!: FormGroup;
    message = '';
    apiURL = 'http://localhost:3001/agrifund/api/v1';
  

    constructor(
        private fb: FormBuilder,
        private validationsService: ValidationsServiceService,
        private router: Router,
        private _apiService: ApiService,
        private http:HttpClient
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
                    this.router.navigate(['/dashboard']);
                    alert('Successfully logged in');
                    // Redirect to dashboard or another page
                },
                (error: HttpErrorResponse) => {
                    // Specify HttpErrorResponse type
                    this.message = 'Wrong username or password';
                }
            );
        }
    }
}
