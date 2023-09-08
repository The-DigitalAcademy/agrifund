/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Assets } from 'src/app/_models/Assets';
import { PortfolioService } from '../../../_services/portfolio-service/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { AssetService } from 'src/app/_services/asset-service/asset.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-equipment-create',
    templateUrl: './equipment-create.component.html',
    styleUrls: ['./equipment-create.component.css'],
})
export class EquipmentCreateComponent implements OnInit {
    asset: Assets = {
        assetName: '',
        assetType: '',
        age: 0,
        purchasePrice: 0,
    };

    createEquipmentForm!: FormGroup;
    submitted = false;
    private assetSubscription = new Subscription();
    constructor(
        private router: Router,
        private _fb: FormBuilder,
        private _portfolioService: PortfolioService,
        private _apiService: ApiService,
        private _assetService: AssetService
    ) {}
    ngOnInit(): void {
        this.createEquipmentForm = this._fb.group({
            equipmentName: ['', [Validators.required]],
            equipmentType: ['', [Validators.required]],
            age: ['', [Validators.required]],
            purchase_Amount: ['', [Validators.required]],
        });
       
}

    get createEquipmentControl() {
        return this.createEquipmentForm.controls;
    }

    
    saveEquipment() {
        this.submitted = true;
        // creates a reusable variable to extract create form input value
        const formInputVal = this.createEquipmentForm.value;
        if (this.createEquipmentForm.valid) {
            this.asset = {
                assetName: formInputVal.equipmentName,
                assetType: formInputVal.equipmentType,
                age: formInputVal.age,
                purchasePrice: formInputVal.purchase_Amount,
            };
            // sends the new asset data 
            this._assetService.createFarmerAsset(this.asset);
            console.table(this.asset);
        }

        //this._assetService.createFarmerAsset(this.asset);
       
       
        this.router.navigate(['/portfolio']);
    }
}
