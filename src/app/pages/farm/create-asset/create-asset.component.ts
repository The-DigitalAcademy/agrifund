import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/_services/asset-service/asset.service';
import { Assets } from 'src/app/_models/Assets';

@Component({
    selector: 'app-create-asset',
    templateUrl: './create-asset.component.html',
    styleUrls: ['./create-asset.component.css'],
})
export class CreateAssetComponent implements OnInit {
    asset!: Assets;
    assetForm!: FormGroup;
    createEquipmentForm!: FormGroup;
    submitted = false;
    private _fb: any;
    private _assetService: any;
    router: any;

    ngOnInit(): void {
        this.assetForm = this._fb.group({
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
            this._assetService.createFarmerAsset(this.asset);
            console.table(this.asset);
            this.router.navigate(['/about-farm']);
        }
    }
}
