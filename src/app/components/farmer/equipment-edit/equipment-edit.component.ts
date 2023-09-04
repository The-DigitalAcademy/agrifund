import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assets } from 'src/app/_models/Assets';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { PortfolioService } from 'src/app/_services/portfolio-service/portfolio.service';

@Component({
    selector: 'app-equipment-edit',
    templateUrl: './equipment-edit.component.html',
    styleUrls: ['./equipment-edit.component.css'],
})
export class EquipmentEditComponent implements OnInit {
    editEquipmentForm!: FormGroup;
    submitted = false;
    asset!: Assets;
    id: any;

    constructor(
        private _apiService: ApiService,
        private router: Router,
        private _fb: FormBuilder,
        private route: ActivatedRoute,
        private _portfolioServiceService: PortfolioService
    ) {}

    ngOnInit(): void {
        // Fetch equipment details using the id
        // Example: this.getEquipmentDetails(id);
        this.getEquipmentDetails((this.id = this.route.snapshot.params['id']));
        console.log(this.id);

        this.editEquipmentForm = this._fb.group({
            assetName: ['', [Validators.required]],
            assetType: ['', [Validators.required]],
            age: ['', [Validators.required]],
            purchasePrice: ['', [Validators.required]],
        });
    }

    getEquipmentDetails(id: any) {
        this._apiService.getAssetById(this.id).subscribe((data: any) => {
            this.asset = data;
            this.editEquipmentForm = this._fb.group({
                assetName: new FormControl(this.asset.assetName),
                assetType: new FormControl(this.asset.assetType),
                age: new FormControl(this.asset.age),
                purchasePrice: new FormControl(this.asset.purchasePrice),
            });
        });
    }

    get createEquipmentControl() {
        return this.editEquipmentForm.controls;
    }

    saveEquipment() {
        this.submitted = true;
        if (this.editEquipmentForm.valid) {
            this.asset = {
                //keep the initial id of the record
                id: 0,
                assetName: this.editEquipmentForm.get('assetName')?.value,
                assetType: this.editEquipmentForm.get('assetType')?.value,
                age: this.editEquipmentForm.get('age')?.value,
                purchasePrice:
                    this.editEquipmentForm.get('purchasePrice')?.value,
            };
            // console.table();
            // this._apiService
            //     .editEquipment()
            //     .subscribe(data => {
                    // Handle success (e.g., show a success message)
                // });
            this.router.navigate(['/equipment-table']);
        }
    }
}
