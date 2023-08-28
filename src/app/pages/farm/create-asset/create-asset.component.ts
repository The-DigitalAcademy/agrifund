import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Asset } from 'src/app/models/asset';

@Component({
    selector: 'app-create-asset',
    templateUrl: './create-asset.component.html',
    styleUrls: ['./create-asset.component.css'],
})
export class CreateAssetComponent {
saveEquipment() {
throw new Error('Method not implemented.');
}
    assets: Asset[] = [];
    id = 0;
    assetForm!: FormGroup;
    private _apiService: any;
    ngOnInit() {
        // Assuming you have a method in your ApiService to get registered user details
        this._apiService.getAllEquipment(this.id).subscribe(
            (user: any) => {
                this.assets = user;
                // Populate the form with user details
                this.assetForm.patchValue({
                    equipmentName: user.name,
                    equipmentType: user.type,
                    age: user.age,
                    purchase_Amount: user.purchase_price,
                });
            },
          (            error: any) => {
                console.error('Error fetching user details:', error);
            }
        );
    }
}
