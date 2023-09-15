import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { ProgressServiceService } from 'src/app/_services/progress-service/progress-service.service';
// import { ProgressService } from 'src/app/services/progress.service';

@Component({
    selector: 'app-farmer-portfolio-progressbar',
    templateUrl: './farmer-portfolio-progressbar.component.html',
    styleUrls: ['./farmer-portfolio-progressbar.component.css'],
})
export class FarmerPortfolioProgressbarComponent {
    progress = 0;

    checklistForm!: FormGroup;

    
    constructor(
        private fb: FormBuilder,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private _progressService: ProgressServiceService
    ) {
           this._progressService.personalInfoCompleted$.subscribe(
               personalProgress => {
                   this._progressService.cropInfoCompleted$.subscribe(
                       cropProgress => {
                           this._progressService.farmInfoCompleted$.subscribe(
                               farmProgress => {
                                   this._progressService.plotInfoCompleted$.subscribe(
                                       plotProgress => {
                                           this._progressService.assetInfoCompleted$.subscribe(
                                               assetProgress => {
                                                   this.progress =
                                                       personalProgress +
                                                       farmProgress +
                                                       plotProgress +
                                                       cropProgress +
                                                       assetProgress; // Calculate the progress
                                               }
                                           );
                                       }
                                   );
                               }
                           );
                       }
                   );
               }
           ); ;
            
    }
    

    toggleCheckbox(controlName: string) {
        const checkboxControl = this.checklistForm.get(controlName);
        if (checkboxControl) {
            checkboxControl.setValue(!checkboxControl.value);
        }
    }

    isCheckboxChecked(controlName: string): boolean {
        const checkboxControl = this.checklistForm.get(controlName);
        return checkboxControl?.value === true;
    }

    ngOnInit() {
        

        this.checklistForm = this.fb.group({
            personalInfo: [false], // Set initial value to false
            farmInfo: [false], // Set initial value to
            cropInfo: [false],
            plotInfo: [false],
            equipmentInfo: [false],
            bookkeepingInfo: [false],
        });

        //Fetch user data from API and populate the form

        this.checklistForm.patchValue({
            personalInfo: true,
        });

        this.checklistForm.patchValue({
            farmInfo: true,
        });

        this.checklistForm.patchValue({
            plotInfo: true,
        });
        this.checklistForm.patchValue({
            equipmentInfo: true,
        });

        this.checklistForm.patchValue({
            cropInfo: true,
        });
        
    }
    
   
}
