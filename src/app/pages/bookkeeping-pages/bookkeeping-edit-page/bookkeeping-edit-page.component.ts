/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 07 Aug 2023 

    DESCRIPTION:
        Within this component record details data is fetched to be edited within the reactive from
        and then sent to the api to be saved if a user chooses to save their changes.

    PARAMETERS:
        _apiService - used to subscribe and call methods related to the api connection
        _bookkeepingService -> used to subscribe and call methods within the bookkeeping service
        $bookkeepingRecord -> stores the bookkeeping record as an observable.
        editRecordForm -> name of the form group used for the reactive form
-------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { BookkeepingService } from 'src/app/_services/bookkeeping-service/bookkeeping.service';

@Component({
    selector: 'app-bookkeeping-edit-page',
    templateUrl: './bookkeeping-edit-page.component.html',
    styleUrls: ['./bookkeeping-edit-page.component.css'],
})
export class BookkeepingEditPageComponent implements OnInit {
    // used to store the id of the bookkeeping record
    id!: any;
    // used to store the bookkeeping record's data retrieved from the api
    record!: IncomeStatementItem;
    // reactive form used
    editRecordForm!: FormGroup;
    // boolean value to check if the save button was clicked
    submitted = false;
    // array to store the types of categories a record can have
    recordType: any = ['Money In', 'Money Out'];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _bookkeepingService: BookkeepingService,
        private fb: FormBuilder,
        private _apiService: ApiService
    ) {}

    ngOnInit() {
        // gets the id passed through the routing url
        this.getRecordDetails((this.id = this.route.snapshot.params['id']));

        this.editRecordForm = this.fb.group({
            recordName: ['', [Validators.required]],
            recordType: ['', [Validators.required]],
            recordAmount: ['', [Validators.required]],
            recordProof: ['', [Validators.required]],
        });
    }

    ngOnDestroy() {}

    getRecordDetails(id: any) {
        // subscribes to api connection to get a bookkeeping record by the id passed through the page url
        this._apiService
            .getStatementItemById(this.id)
            .subscribe((data: any) => {
                this.record = data;
                // set the input values to the data from the api service
                this.editRecordForm = this.fb.group({
                    recordName: new FormControl(this.record.description),
                    recordType: new FormControl(this.record.category),
                    recordAmount: new FormControl(this.record.amount),
                    recordProof: new FormControl(this.record.proof),
                });
            });
    }

    // routes back to view record page
    goBackToDetails(recordId: any) {
        // console.log(recordId);
        this.router.navigate(['bookkeeping/view-record', recordId]);
    }

    get createRecordControl() {
        return this.editRecordForm.controls;
    }

    // when the save changes button is clicked
    saveRecord() {
        this.submitted = true;

        if (this.editRecordForm.valid) {
            // when save button is clicked on form it will save the values in the input fields to the record object
            this.record = {
                // takes the existing record id and saves it to the object being passed
                id: this.record.id,
                statement_id: 0,
                description: this.editRecordForm.get('recordName')?.value,
                category: this.editRecordForm.get('recordType')?.value,
                amount: this.editRecordForm.get('recordAmount')?.value,
                proof:
                    'src/assets/mock-api/bookkeeping-record-proof/' +
                    this.editRecordForm.get('recordProof')?.value,
                date: this.record.date,
            };
            // console.table(this.record);
            // passes body and record id to the api connection
            this._apiService
                .updateRecord(this.record.id, this.record)
                .subscribe(data => {
                    // console.log(data);
                    // console.table(this.editRecordForm.value);
                });
            this.router.navigate(['bookkeeping/view-record', this.record.id]);
        }
    }
}
