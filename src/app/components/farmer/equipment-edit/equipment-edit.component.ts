/* ------------------------------------------------------------------------------------------------
    AUTHOR: Kamogelo Precious
    CREATE DATE: 06 Aug 2023
    

    PARAMETERS:
        _apiService - used to subscribe and call methods related to the api connection
        _portfolioService -> used to subscribe and call methods within the portfolio service
        editEquipmentForm -> name of the form group used for the reactive form
-------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from 'src/app/_models/asset';
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

        // Creating a form group using FormBuilder (_fb)
        this.editEquipmentForm = this._fb.group({
            // Defining form controls with initial values and validators
            equipmentName: ['', [Validators.required]], // Equipment name input with required validation
            equipmentType: ['', [Validators.required]], // Equipment type input with required validation
            equipmentAge: ['', [Validators.required]], // Equipment age input with required validation
            equipmentAmount: ['', [Validators.required]], // Equipment amount input with required validation
        });
    }

    // This function fetches equipment details based on the provided 'id'
    getEquipmentDetails(id: any) {
        // Using the _apiService to get equipment data by its ID
        this._apiService.getEquipmentById(this.id).subscribe((data: any) => {
            // Assigning the fetched data to the 'asset' variable
            this.asset = data;

            // Creating a new FormGroup for editing equipment details using the FormBuilder (_fb)
            this.editEquipmentForm = this._fb.group({
                equipmentName: new FormControl(this.asset.name), // Initializing equipmentName with the fetched name
                equipmentType: new FormControl(this.asset.type), // Initializing equipmentType with the fetched type
                equipmentAge: new FormControl(this.asset.age), // Initializing equipmentAge with the fetched age
                equipmentAmount: new FormControl(this.asset.purchase_price), // Initializing equipmentAmount with the fetched purchase_price
            });
        });
    }

    // Getter function to retrieve the controls of the editEquipmentForm
    get createEquipmentControl() {
        // Return the controls of the editEquipmentForm
        return this.editEquipmentForm.controls;
    }

    saveEquipment() {
        // Mark the form as submitted
        this.submitted = true;

        // Check if the form is valid
        if (this.editEquipmentForm.valid) {
            // Create an object representing the asset data
            this.asset = {
                // Keep the initial id of the record
                id: this.asset.id,
                farm_id: this.asset.farm_id,
                name: this.editEquipmentForm.get('equipmentName')?.value,
                type: this.editEquipmentForm.get('equipmentType')?.value,
                age: this.editEquipmentForm.get('equipmentAge')?.value,
                purchase_price:
                    this.editEquipmentForm.get('equipmentAmount')?.value,
            };

            // Log the asset data to the console as a table
            console.table(this.asset);

            // Call the API service to edit the equipment data
            this._apiService
                .editEquipment(this.asset.id, this.asset)
                .subscribe(data => {
                    // Handle success response (e.g., show a success message)
                    // This part can be filled with appropriate actions or notifications
                });

            // Navigate to the '/portfolio' route after saving
            this.router.navigate(['/portfolio']);
        }
    }
}
