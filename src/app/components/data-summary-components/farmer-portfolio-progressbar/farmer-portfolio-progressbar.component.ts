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
    @Input() progressPercentage = 0;

    checklistForm!: FormGroup;

    // hardcoded farmer id
    farmerId = 1;

    constructor(
        private fb: FormBuilder,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private _progressService: ProgressServiceService
    ) {}

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
        this._progressService.personalInfoCompleted$.subscribe(
            personalInfoCompleted => {
                if (personalInfoCompleted) {
                    this.progressPercentage += 35;
                }
            }
        );

        this._progressService.cropInfoCompleted$.subscribe(
            cropInfoCompleted => {
                if (cropInfoCompleted) {
                    this.progressPercentage += 7;
                }
            }
        );

        this._progressService.farmInfoCompleted$.subscribe(
            farmInfoCompleted => {
                if (farmInfoCompleted) {
                    this.progressPercentage += 35;
                }
            }
        );

        this.progressPercentage = Math.min(this.progressPercentage, 100);

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
        // Update progress based on personal info completion
        // this.progressService.setPersonalInfoCompleted(true);
        //     },
        //     error => {
        //         console.error('Error fetching user details:', error);
        //     }
        // );
    }
    
   
}
