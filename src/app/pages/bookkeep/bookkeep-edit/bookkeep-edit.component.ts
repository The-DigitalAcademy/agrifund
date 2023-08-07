/* ------------------------------------------------------------------------------------------------
    DESCRIPTION:
        Within this component record details data is fetched to be edited within the reactive from
        and then sent to the api to be saved if a user chooses to save their changes.

    PARAMETERS:
        _apiService - used to subscribe and call methods related to the api connection
        _bookkeepService -> used to subscribe and call methods within the bookkeep service
        $bookkeepRecord -> stores the bookkeeping record as an observable.
        editRecordForm -> name of the form group used for the reactive form

    AUTHOR: Monique
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 07 Aug 2023 
-------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeStatementItem } from 'src/app/models/income-statement-item';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepService } from 'src/app/services/bookkeep/bookkeep.service';

@Component({
    selector: 'app-bookkeep-edit',
    templateUrl: './bookkeep-edit.component.html',
    styleUrls: ['./bookkeep-edit.component.css'],
})
export class BookkeepEditComponent implements OnInit {
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
        private _bookkeepService: BookkeepService,
        private fb: FormBuilder,
        private _apiService: ApiService
    ) {}

    ngOnInit() {
        this.getRecordDetails((this.id = this.route.snapshot.params['id']));

        this.editRecordForm = this.fb.group({
            recordName: ['', [Validators.required]],
            recordType: ['', [Validators.required]],
            recordAmount: ['', [Validators.required]],
            recordProof: ['', [Validators.required]],
        });
    }

    getRecordDetails(id: any) {
        this._apiService
            .getStatementItemById(this.id)
            .subscribe((data: any) => {
                this.record = data;
                // set the input values to the data from the api service
                this.editRecordForm = this.fb.group({
                    recordName: new FormControl(this.record.description),
                    recordType: new FormControl(this.record.category),
                    recordAmount: new FormControl(this.record.amount),
                    recordProof: new FormControl(this.record.amount),
                });
            });
    }

    goBackToDetails(recordId: any) {
        // console.log(recordId);
        this.router.navigate(['bookkeep/view-record', recordId]);
    }

    get createRecordControl() {
        return this.editRecordForm.controls;
    }

    saveRecord() {
        this.submitted = true;
        if (this.editRecordForm.valid) {
            this.record = {
                id: this.record.id,
                statement_id: 0,
                description: this.editRecordForm.get('recordName')?.value,
                category: this.editRecordForm.get('recordType')?.value,
                amount: this.editRecordForm.get('recordAmount')?.value,
                proof:
                    'src/assets/mock-api/bookkeep-record-proof/' +
                    this.editRecordForm.get('recordProof')?.value,
            };
            console.table(this.record);
            this._apiService
                .updateRecord(this.record.id, this.record)
                .subscribe(data => {
                    // console.log(data);
                    // console.table(this.editRecordForm.value);
                });
            this.router.navigate(['bookkeep/view-record', this.record.id]);
        }
    }
}