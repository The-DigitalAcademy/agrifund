/* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Asset } from 'src/app/_models/asset';
import { ApiService } from 'src/app/_services/api-service/api.service';

@Component({
    selector: 'app-equipment-table',
    templateUrl: './equipment-table.component.html',
    styleUrls: ['./equipment-table.component.css'],
})
export class EquipmentTableComponent {
    assets: Asset[] = [];
    isLast: any;
    constructor(
        private _apiService: ApiService,
        private router: Router
    ) {}

    ngOnInit() {
        //use the method to get the all the data
        this._apiService.getAllEquipment().subscribe((data: any) => {
            // console.table(assets)
            this.assets = data;
        });
    }

    ngOnDestroy() {}

    onEditClicked(id: number) {
        this.router.navigate(['/equipment-edit', id]);
    }
}
