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
    id!: any;
    record!: IncomeStatementItem;
    editRecordForm!: FormGroup;
    submitted = false;
    recordType: any = ['Money In', 'Money Out'];
    createRecordForm: any;

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

    /* ------------------------------------------------------------------------------------------------
        DESCRIPTION:
            Get record details fetches the record details from the api service and displays them in the
            input fields
        PARAMETER: 
            id - refers to the id of the record

        AUTHOR: Monique
        CREATE DATE: 04 Aug 2023
    -------------------------------------------------------------------------------------------------*/

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
