import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/_models/User';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
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
        private _apiService: ApiService
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
        // this._portfolioService.personalInfoCompleted$.subscribe(
        //     personalInfoCompleted => {
        //         if (personalInfoCompleted) {
        //             this.progressPercentage += 35;
        //         }
        //     }
        // );

        // this.progressService.cropInfoCompleted$.subscribe(cropInfoCompleted => {
        //     if (cropInfoCompleted) {
        //         this.progressPercentage += 30;
        //     }
        // });

        // this.progressService.farmInfoCompleted$.subscribe(farmInfoCompleted => {
        //     if (farmInfoCompleted) {
        //         this.progressPercentage += 35;
        //     }
        // });

        this.checklistForm = this.fb.group({
            personalInfo: [false], // Set initial value to false
            farmInfo: [false], // Set initial value to
            cropInfo: [false],
            equipmentInfo: [false],
            bookkeepingInfo: [false],
        });

        // Fetch user data from API and populate the form
        this._apiService.getFarmerUser(this.farmerId).subscribe(
            (user: User) => {
                // Update the checkbox
                this.checklistForm.patchValue({
                    personalInfo: true,
                });

                // this.checklistForm.patchValue({
                //     farmInfo: true,
                // });

                // Update progress based on personal info completion
                // this.progressService.setPersonalInfoCompleted(true);
            },
            error => {
                console.error('Error fetching user details:', error);
            }
        );
    }
}
