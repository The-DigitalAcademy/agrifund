/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 10 Aug 2023 

    DESCRIPTION:
    All the methods related to logging in a farmer

-------------------------------------------------------------------------------------------------*/
// Import necessary modules and components from Angular core and other sources
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/authentication-service/auth.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { FarmService } from 'src/app/_services/farm-service/farm.service';
import { Plot } from 'src/app/_models/plot';
import { PlotService } from 'src/app/_services/plot-service/plot.service';
import { CropService } from 'src/app/_services/crop-service/crop.service';
import { Assets } from 'src/app/_models/Assets';
import { AssetService } from 'src/app/_services/asset-service/asset.service';
import { JwtService } from 'src/app/_services/JWT-service/jwt.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
    LoginForm!: FormGroup; // Form group to hold login form controls
    message = ''; // Message to display error or validation messages
    // used to store subscriptions to services
    private subscription = new Subscription();
    apiResponse: any;

    constructor(
        private fb: FormBuilder,
        private _validationsService: ValidationService,
        private router: Router,
        // private userService: UserService, // Service to handle user-related functionalities
        private _apiService: ApiService, // Service to make API requests
        private _farmService: FarmService,
        private _plotService: PlotService,
        private _cropService: CropService,
        private _assetService: AssetService,
        private _jwtService: JwtService,
        private _authService: AuthService
    ) {}

    ngOnInit() {
        // Initialize the login form with email and password fields
        this.LoginForm = this.fb.group({
            email: [
                '',
                [
                    Validators.required,
                    this._validationsService.emailValidator(),
                ],
            ],
            password: [
                '',
                [
                    Validators.required,
                    this._validationsService.passwordValidator(),
                ],
            ],
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        if (this.LoginForm.valid) {
            const formInputVal = this.LoginForm.value;
            // passes the from data to the authentication service
            this.subscription.add(
                this._authService.loginUser(
                    formInputVal.email,
                    formInputVal.password
                )
            );
        }
    }
    // logs a user into the application
    loginUser(loginEmail: string, loginPassword: string) {
        // set the body that will be passed to the api connection
        const loginBody = {
            email: loginEmail,
            password: loginPassword,
        };
        this._apiService.loginUser(loginBody).subscribe((result: any) => {
            // assigns the result to the structure of the api response object
            this.apiResponse = result;
            // sets the token to the one received from the api
            this._jwtService.setToken(this.apiResponse.data);
            // sets the user login state to true
            this.setUserState();
            if (this._farmService.getFarmInfo().length > 0) {
                // routes to dashboard if the login was successful
                this.router.navigate(['/dashboard']);
            } else {
                // TODO: if the farm, crop, plot, asset info is blank it will route to tell me about your farm
                this.router.navigate(['/about-farm']);
            }
            if (this._plotService.getPlotInfo().length > 0) {
                // routes to dashboard if the login was successful
                this.router.navigate(['/dashboard']);
            } else {
                // TODO: if the farm, crop, plot, asset info is blank it will route to tell me about your farm
                this.router.navigate(['/about-farm']);
            }
            this._cropService.getCropInfo().subscribe(crops => {
                if (crops.length > 0) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/about-farm']);
                }
            });

            this._assetService.getAssetInfo().subscribe(assets => {
                if (assets.length > 0) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/about-farm']);
                }
            });
        });
    }
    setUserState() {
        throw new Error('Method not implemented.');
    }

  
}
