/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Assets } from 'src/app/_models/Assets';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { AssetService } from 'src/app/_services/asset-service/asset.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { ProgressServiceService } from 'src/app/_services/progress-service/progress-service.service';

@Component({
    selector: 'app-equipment-table',
    templateUrl: './equipment-table.component.html',
    styleUrls: ['./equipment-table.component.css'],
})
export class EquipmentTableComponent {
    asset!: Assets; // Initializing assets with interfaceAsset
    isLast: any;
    submitted = false;
    isDisabled = true;
    equipmentForm!: FormGroup;
    private initialProgress = 0; // Initialize the initial progress

    private assetSubscription = new Subscription();
    constructor(
        private _apiService: ApiService,
        private router: Router,
        private _fb: FormBuilder,
        private _portfolioService: PortfolioService,
        private _progressService: ProgressServiceService,
        private _assetService: AssetService
    ) {}

    ngOnInit() {
        this.equipmentForm = this._fb.group({
            equipmentName: ['', [Validators.required]],
            equipmentType: ['', [Validators.required]],
            age: ['', [Validators.required]],
            purchase_Amount: ['', [Validators.required]],
        });

        this.asset = {
            id: 0,
            assetName: '',
            assetType: '',
            age:0,
            purchasePrice: 0,
        };
        this._portfolioService.setFarmerPortfolio();
        this.assetSubscription = this._portfolioService
            .getFarmerAssetInfo()
            .subscribe((asset: Assets[]) => {
                console.table(asset);

                //  contains fields like first_name, last_name, email, id_number, cell_number
                this.equipmentForm.patchValue({
                    equipmentName: asset[0].assetName,
                    equipmentType: asset[0].assetType,
                    age: asset[0].age,
                    purchase_Amount: asset[0].purchasePrice,
                });
                this.isDisabled = true;
                // Calculate the initial progress when the component is initialized
                this.initialProgress = this.calculateProgress();
            });
        this.equipmentForm.valueChanges.subscribe(() => {
            const progress = this.calculateProgress();
            this._progressService.setAssetInfoCompleted(progress);
        });
    }

    calculateProgress(): number {
        // Calculate and return the progress based on form completion
        const totalFields = Object.keys(this.equipmentForm.controls).length;
        const completedFields = Object.keys(this.equipmentForm.controls).filter(
            controlName => this.equipmentForm.controls[controlName].valid
        ).length;
        return (completedFields / totalFields) * 20;
    }

   

    onCancelClicked() {
        // Reset the form values to the original values (cropInfo)
        this.equipmentForm.patchValue({
            assetName: this.asset.assetName,
            assetType: this.asset.assetType,
            age: this.asset.age,
            purchase_Amount: this.asset.purchasePrice,
        });
        this.isDisabled = true;
        this.equipmentForm.disable();
    }
    onSaveClicked() {
        
        this.submitted = true;
        if (this.equipmentForm.valid) {
            this.asset = {
                id: this.asset.id,
                assetName: this.equipmentForm.get('assetName')?.value,
                assetType: this.equipmentForm.get('assetType')?.value,
                age: this.equipmentForm.get('age')?.value,
                purchasePrice: this.equipmentForm.get('purchase_Amount'
                )?.value,
            };

             setTimeout(() => {
                 console.log('Form saved:', this.equipmentForm.value);
                 // Assuming the save was successful, increase the progress
                 const progress = this.calculateProgress() + 20;
                 this._progressService.setAssetInfoCompleted(progress);
             }, 1000);

             console.table(this.asset);
             this._assetService.editAsset(this.asset)
        }
this.equipmentForm.disable();
this.isDisabled = true;
        
    }
    enableFields() {
        this.isDisabled = false;
        this.equipmentForm.enable();
        // Update the progress when "Edit" is clicked based on the initial progress
        const progress = this.calculateProgress() - this.initialProgress;
        this._progressService.setAssetInfoCompleted(progress);
    }
}
