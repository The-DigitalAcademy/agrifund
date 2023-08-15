import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
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
        private validationsService: ValidationsServiceService,private apiServive:ApiService
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
}
