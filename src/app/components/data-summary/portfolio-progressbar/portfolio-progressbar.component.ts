import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api/api.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
    selector: 'app-portfolio-progressbar',
    templateUrl: './portfolio-progressbar.component.html',
    styleUrls: ['./portfolio-progressbar.component.css'],
})
export class PortfolioProgressbarComponent {
    @Input() progressPercentage = 0;

    checklistForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private progressService: ProgressService,
        private _apiService: ApiService
    ) {}

      // Toggle the value of a checkbox control
  toggleCheckbox(controlName: string) {
    const checkboxControl = this.checklistForm.get(controlName);
    if (checkboxControl) {
      checkboxControl.setValue(!checkboxControl.value);
    }
  }

  // Check if a checkbox control is checked
  isCheckboxChecked(controlName: string): boolean {
    const checkboxControl = this.checklistForm.get(controlName);
    return checkboxControl?.value === true;
  }

  ngOnInit() {
    // Subscribe to the personalInfoCompleted$ observable from the ProgressService
    this.progressService.personalInfoCompleted$.subscribe(
      personalInfoCompleted => {
        if (personalInfoCompleted) {
          // Increase the progressPercentage when personal info is completed
          this.progressPercentage += 35;
        }
      }
    );

    // Subscribe to the cropInfoCompleted$ observable from the ProgressService
    this.progressService.cropInfoCompleted$.subscribe(cropInfoCompleted => {
      if (cropInfoCompleted) {
        // Increase the progressPercentage when crop info is completed
        this.progressPercentage += 30;
      }
    });

        this.progressService.farmInfoCompleted$.subscribe(farmInfoCompleted => {
            if (farmInfoCompleted) {
                this.progressPercentage += 35;
            }
        });

       

        this.checklistForm = this.fb.group({
            personalInfo: [false], // Set initial value to false
            farmInfo: [false], // Set initial value to
            cropInfo: [false],
            equipmentInfo: [false],
            bookkeepingInfo: [false],
            
        });

         // Fetch user data from API and populate the form
         this._apiService.getRegisterUser().subscribe(
            (user: Users) => {
               

                // Update the checkbox
                this.checklistForm.patchValue({
                    personalInfo: true,
                });

                // this.checklistForm.patchValue({
                //     farmInfo: true,
                // });



                // Update progress based on personal info completion
                this.progressService.setPersonalInfoCompleted(true);
            },
            (error) => {
                console.error('Error fetching user details:', error);
            }
        );
    }

    
}
