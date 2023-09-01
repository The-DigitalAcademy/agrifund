/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Assets } from 'src/app/_models/FarmerPortfolio';
import { ApiService } from 'src/app/_services/api-service/api.service';

@Component({
    selector: 'app-equipment-table',
    templateUrl: './equipment-table.component.html',
    styleUrls: ['./equipment-table.component.css'],
})
export class EquipmentTableComponent {
    onSaveClicked($event: any) {
        throw new Error('Method not implemented.');
    }
    enableFields() {
        throw new Error('Method not implemented.');
    }
    isDisabled = true;
    onFileSelected($event: Event) {}

    assets: Assets[] = []; // Initializing assets with interfaceAsset
    isLast: any;
    equipmentForm!: FormGroup;

    constructor(
        private _apiService: ApiService,
        private router: Router
    ) {}

    ngOnInit() {
        //use the method to get the all the data
        const farmName = '';
        this._apiService.getAllFarmAssets(farmName).subscribe((data: any) => {
            // console.table(assets)
            this.assets = data;
        });
    }

    onEditClicked(id: number) {
        this.router.navigate(['/equipment-edit', id]);
    }
}
