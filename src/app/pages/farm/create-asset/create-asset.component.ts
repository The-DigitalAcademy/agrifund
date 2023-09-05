
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Assets } from 'src/app/_models/Assets';
import { AssetService } from 'src/app/_services/asset-service/asset.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-create-asset',
    templateUrl: './create-asset.component.html',
    styleUrls: ['./create-asset.component.css'],
})
export class CreateAssetComponent implements OnInit {
    asset!: Assets;
    assetForm!: FormGroup;
    submitted = false;
    constructor(
    private fb: FormBuilder,
    private _assetService: AssetService,
    private _portfolioService: PortfolioService,
    private router: Router
    ){}
    ngOnInit(): void {
        this.assetForm = this.fb.group({
            assetName: ['', [Validators.required]],
            assetType: ['', [Validators.required]],
            purchasePrice: ['', [Validators.required]],
            age: ['', [Validators.required]],
            // proofOfOwnership: ['', [Validators.required]],
        });
    }

    //test if the the data filled in the form is valid
    //also check if the data can display on the console
    saveEquipment() {
        if (this.assetForm.valid) {
            const formInputValue = this.assetForm.value;
            this.asset = {
                id: 0,
                assetName: formInputValue.assetName,
                assetType: formInputValue.assetType,
                purchasePrice: formInputValue.purchasePrice,
                age: formInputValue.age,
                // proofOfOwnership: formInputValue.proofOfOfOwnership,
            };
               this.checkAssetInfo();
        
    }

    }
    // check if farm info has already been submitted
    checkAssetInfo() {
        // set the portfolio info for a logged in farmer
        this._portfolioService.setFarmerPortfolio();

        this._portfolioService.getFarmerFarm().subscribe(asset => {
            console.table(asset);
            // checks if the crop info is not empty
            if (asset.length === 0) {
                this._assetService.createFarmerAsset(this.asset);
                console.log(`Farm has been submitted`);

                this.router.navigate(['/slide5']);

            }
        });
    }

}
        


