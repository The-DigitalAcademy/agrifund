import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/_models/asset';

@Component({
    selector: 'app-create-asset',
    templateUrl: './create-asset.component.html',
    styleUrls: ['./create-asset.component.css'],
})

export class CreateAssetComponent implements OnInit {
    asset!: Asset;
    assetForm!: FormGroup;
    createEquipmentForm!: FormGroup;
    submitted = false;
    private _fb: any;
    private _portfolioService: any;
   
    ngOnInit(): void {
        this.assetForm = this._fb.group({
            assetName: ['', [Validators.required]],
            assetType: ['', [Validators.required]],
            age: ['', [Validators.required]],
            purchasePrice: ['', [Validators.required]],
            // proofOfOwnership: ['', [Validators.required]],
        });
    }

    //test if the the data filled in the form is valid
    //also check if the data can display on the console
    saveEquipment() {
        if (this.assetForm.valid) {
            const formInputValue = this.assetForm.value;
            this.asset = {
                assetName: formInputValue.assetName,
                assetType: formInputValue.assetType,
                age: formInputValue.age,
                purchasePrice: formInputValue.purchasePrice,
                // proofOfOwnership: formInputValue.proofOfOfOwnership,
            };
            this._portfolioService.createFarmerAssetInfo(this.asset);
            console.table(this.asset)
        }
    }
  
}

