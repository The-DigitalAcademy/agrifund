/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Asset } from 'src/app/_models/asset';
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

    assets: Asset[] = []; // Initializing assets with interfaceAsset
    isLast: any;
    equipmentForm!: FormGroup;

    constructor(
        private _apiService: ApiService,
        private router: Router
    ) {}

    ngOnInit() {
        // Fetch all equipment data from the API service
        this._apiService.getAllEquipment().subscribe((data: any) => {
            this.assets = data; // Populate the assets array with retrieved data
        });
    }

    ngOnDestroy() {}

    onEditClicked(id: number) {
        this.router.navigate(['/equipment-edit', id]);
    }
}
