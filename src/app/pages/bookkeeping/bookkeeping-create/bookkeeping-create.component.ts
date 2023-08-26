import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepingService } from 'src/app/services/bookkeeping/bookkeeping.service';

@Component({
    selector: 'app-bookkeeping-create',
    templateUrl: './bookkeeping-create.component.html',
    styleUrls: ['./bookkeeping-create.component.css'],
})
export class BookkeepingCreateComponent implements OnInit {
    createRecordForm!: FormGroup;
    submitted = false;
    recordType: any = ['Money In', 'Money Out'];

    record!: IncomeStatementItem;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _apiService: ApiService,
        private _bookkeepingService: BookkeepingService
    ) {}

    ngOnInit() {
        this.createRecordForm = this.fb.group({
            recordName: ['', [Validators.required]],
            recordType: ['', [Validators.required]],
            recordAmount: ['', [Validators.required]],
            recordProof: ['', [Validators.required]],
            recordDate: ['', [Validators.required]],
        });
    }

    get createRecordControl() {
        return this.createRecordForm.controls;
    }

    saveRecord() {
        this.submitted = true;
        if (this.createRecordForm.valid) {
            this.record = {
                id: this._bookkeepingService.generateRecordId(),
                statement_id: 0,
                description: this.createRecordForm.get('recordName')?.value,
                category: this.createRecordForm.get('recordType')?.value,
                amount: this.createRecordForm.get('recordAmount')?.value,
                proof:
                    'src/assets/mock-api/bookkeeping-record-proof/' +
                    this.createRecordForm.get('recordProof')?.value,
                date: this.createRecordForm.get('recordDate')?.value,
            };

            // console.table(this.record);

            this._apiService.addRecord(this.record).subscribe(data => {
                // adds the new record to the observable array after successfully adding the record
                this._bookkeepingService.addRecord(this.record);
            });

            this.router.navigate(['/bookkeeping']);
        }
    }
}
