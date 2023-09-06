/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { ValidationService } from 'src/app/_services/validation-service/validation.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { Farm } from 'src/app/_models/Farm';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-disabledform-farm-info',
    templateUrl: './disabledform-farm-info.component.html',
    styleUrls: ['./disabledform-farm-info.component.css'],
})
export class DisabledformFarmInfoComponent {
    originalFormValues: any;
    myForm!: FormGroup;
    isDisabled = true;
    private farmSubscription = new Subscription();
    farmInfo!: Farm;
    //     id: any;
    constructor(
        private _fb: FormBuilder,
        private _validationsService: ValidationService,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // this.getPlotInfo((this.FarmId= this.route.snapshot.params['id']));
        // console.log(this.FarmId);

        this.myForm = this._fb.group({
            farmerAddress: new FormControl('', [
                Validators.required,
                this._validationsService.addressContainsStreetValidator,
            ]),
            farm_name: new FormControl('', [
                Validators.required,
                this._validationsService.textWithoutNumbersValidator(),
            ]),
            farmAddress: new FormControl('', [
                Validators.required,
                this._validationsService.addressContainsStreetValidator,
            ]),

            years: new FormControl('', [
                Validators.required,
                this._validationsService.isNumericValidator(),
            ]),
            reasonForFunding: new FormControl('', [Validators.required]),
            num_employee: new FormControl('', [
                Validators.required,
                this._validationsService.isNumericValidator(),
            ]),
        });

               this._portfolioService.setFarmerFarm();

          
              this.farmSubscription = this._portfolioService
                  .getFarmerFarm()
                  .subscribe((farms: Farm[]) => {
                    //   console.table(farms);

                      // Assuming 'data' contains fields like first_name, last_name, email, id_number, cell_number
                      this.myForm.patchValue({
                          farm_name: farms[0].farmName,
                          farmAddress: farms[0].farmAddress,
                          years: farms[0].yearsActive,
                          farmerAddress: farms[0].address,
                          num_employee: farms[0].numberOfEmployees,
                          reasonForFunding: farms[0].farmingReason,
                      });

                      //Update progress for personal info completion
                      //this._progressService.setPersonalInfoCompleted(true);

                      // Set the 'isDisabled' flag to false to enable form editing
                      this.isDisabled = true;
                  });
          
    }

   

  

        get createFarmControl() {
            return this.myForm.controls;
        }

    enableFields() {
        this.isDisabled = false; // Enable the fields by setting isDisabled to false
        this.myForm.enable(); // Enable the formGroup
    }

    

    onSaveClicked(formData: any) {
       

        this.isDisabled = true;
        this.myForm.disable();
        // this.progressService.setFarmInfoCompleted(true);
    }

    onCancelClicked() {
        // Reset the form values to the original values
        this.myForm.patchValue(this.originalFormValues);

        // Disable the form fields again
        this.isDisabled = true;
        this.myForm.disable();
    }
}
