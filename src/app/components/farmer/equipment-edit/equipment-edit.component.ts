import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from 'src/app/models/asset';
import { ApiService } from 'src/app/services/api/api.service';
import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';

@Component({
    selector: 'app-equipment-edit',
    templateUrl: './equipment-edit.component.html',
    styleUrls: ['./equipment-edit.component.css'],
})
export class EquipmentEditComponent implements OnInit {
    editEquipmentForm!: FormGroup;
    submitted = false;
    asset!: Asset;
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
            equipmentName: ['', [Validators.required]],
            equipmentType: ['', [Validators.required]],
            equipmentAge: ['', [Validators.required]],
            equipmentAmount: ['', [Validators.required]],
        });
    }

    getEquipmentDetails(id: any) {
        this._apiService.getEquipmentById(this.id).subscribe((data: any) => {
            this.asset = data;
            this.editEquipmentForm = this._fb.group({
                equipmentName: new FormControl(this.asset.name),
                equipmentType: new FormControl(this.asset.type),
                equipmentAge: new FormControl(this.asset.age),
                equipmentAmount: new FormControl(this.asset.purchase_price),
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
                id: this.asset.id,
                farm_id: this.asset.farm_id,
                name: this.editEquipmentForm.get('equipmentName')?.value,
                type: this.editEquipmentForm.get('equipmentType')?.value,
                age: this.editEquipmentForm.get('equipmentAge')?.value,
                purchase_price:
                    this.editEquipmentForm.get('equipmentAmount')?.value,
            };
            console.table(this.asset);
            this._apiService
                .editEquipment(this.asset.id, this.asset)
                .subscribe(data => {
                    // Handle success (e.g., show a success message)
                });
            this.router.navigate(['/equipment-table', this.asset.id]);
        }
    }
}
