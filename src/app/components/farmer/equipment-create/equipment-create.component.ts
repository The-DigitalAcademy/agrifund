/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Asset } from '../../../_models/asset';
import { PortfolioService } from '../../../_services/portfolio-service/portfolio.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api-service/api.service';

@Component({
    selector: 'app-equipment-create',
    templateUrl: './equipment-create.component.html',
    styleUrls: ['./equipment-create.component.css'],
})
export class EquipmentCreateComponent implements OnInit {
    asset!: Asset;

    createEquipmentForm!: FormGroup;
    submitted = false;
    constructor(
        private router: Router,
        private _fb: FormBuilder,
        private _portfolioServiceService: PortfolioService,
        private _apiService: ApiService
    ) {}
    ngOnInit(): void {
        this.createEquipmentForm = this._fb.group({
            assetName: ['', [Validators.required]],
            assetType: ['', [Validators.required]],
            age: ['', [Validators.required]],
            purchasePrice: ['', [Validators.required]],
        });
    }

    //test if the the data filled in the form is valid
    //also check if the data can display on the console
    saveEquipment() {
        this.submitted = true;
        if (this.createEquipmentForm.valid) {
            this.asset = {
                assetName: this.createEquipmentForm.get('assetName')?.value,
                assetType: this.createEquipmentForm.get('assetType')?.value,
                age: this.createEquipmentForm.get('age')?.value,
                purchasePrice:
                    this.createEquipmentForm.get('purchasePrice')?.value,
            };

            console.table(this.asset);
            // this._apiService.addAsset(this.asset).subscribe(data => {
            //     console.table(data);
            // });

            this.router.navigate(['/portfolio']);
        }
    }
}
