/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Assets } from 'src/app/_models/Assets';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';

@Component({
    selector: 'app-equipment-table',
    templateUrl: './equipment-table.component.html',
    styleUrls: ['./equipment-table.component.css'],
})
export class EquipmentTableComponent {
    asset: Assets[] = []; // Initializing assets with interfaceAsset
    isLast: any;
    submitted = false;
    isDisabled = true;
    equipmentForm!: FormGroup;
    onFileSelected($event: Event) {}
    private assetSubscription = new Subscription();
    constructor(
        private _apiService: ApiService,
        private router: Router,
        private _fb: FormBuilder,
        private _portfolioService: PortfolioService
    ) {}

    ngOnInit() {
        this.equipmentForm = this._fb.group({
            equipmentName: ['', [Validators.required]],
            equipmentType: ['', [Validators.required]],
            age: ['', [Validators.required]],
            purchase_Amount: ['', [Validators.required]],
        });
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
            });
        //use the method to get the all the data
        // const farmName = '';
        // this._apiService.getAllFarmAssets(farmName).subscribe((data: any) => {
        //     // console.table(assets)
        //     this.asset = data;
        // });
    }

    onEditClicked(id: number) {
        this.router.navigate(['/equipment-edit', id]);
    }

    onCancelClicked() {
     this.isDisabled = true;
     this.equipmentForm.disable();
    }
    onSaveClicked() {
        this.equipmentForm.disable();
        this.isDisabled = true;
        this.submitted = true;
    }
    enableFields() {
       this.isDisabled = false;
       this.equipmentForm.enable();
    }
}
