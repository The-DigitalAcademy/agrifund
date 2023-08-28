import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Asset } from 'src/app/_models/asset';

@Component({
    selector: 'app-create-asset',
    templateUrl: './create-asset.component.html',
    styleUrls: ['./create-asset.component.css'],
})
export class CreateAssetComponent {
    fb: any;
    private _apiService: any;
    assets: Asset[] = [];
    id = 0;
    assetForm!: FormGroup;
    router: any;
    equipForm!: FormGroup;
    ngOnInit() {
        //  Assuming you have a method in your ApiService to get registered user details
        // this._apiService.getAllEquipment(this.id).subscribe(
        //     (user: any) => {
        //         this.assets = user;
        //         // Populate the form with user details
        //         this.equipForm.patchValue({
        //             equipmentName: user.name,
        //             equipmentType: user.type,
        //             age: user.age,
        //             purchase_Amount: user.purchase_price,
        //         });
        //     },
        //     (error: any) => {
        //         console.error('Error fetching user details:', error);
        //     }
        // );
        this.equipForm = this.fb.group({
            equipmentName: ['', Validators.required],
            equipmentType: ['', Validators.required],
            purchase_Amount: ['', Validators.required],
            age: ['', Validators.required],
            recordProof:['', Validators.required],
        
        });
    }

    saveEquipment() {
        this.router.navigate(['/about-farm'], {
            fragment: 'slide5',
        });
    }
}


//  this._apiService.getAllEquipment(this.id).subscribe(
//             (user: any) => {
//                 this.assets = user;
                // Populate the form with user details
            //     this.assetForm.patchValue({
            //         equipmentName: user.name,
            //         equipmentType: user.type,
            //         age: user.age,
            //         purchase_Amount: user.purchase_price,
            //     });
                 
            // },