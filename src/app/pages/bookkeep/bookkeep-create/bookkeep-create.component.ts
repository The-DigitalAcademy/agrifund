import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepService } from 'src/app/services/bookkeep/bookkeep.service';

@Component({
    selector: 'app-bookkeep-create',
    templateUrl: './bookkeep-create.component.html',
    styleUrls: ['./bookkeep-create.component.css'],
})
export class BookkeepCreateComponent implements OnInit {
    createRecordForm!: FormGroup;
    submitted = false;
    recordType: any = ['Money In', 'Money Out'];

    record!: IncomeStatementItem;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _apiService: ApiService,
        private _bookkeepService: BookkeepService
    ) {}

    ngOnInit() {
        this.createRecordForm = this.fb.group({
            recordName: ['', [Validators.required]],
            recordType: ['', [Validators.required]],
            recordAmount: ['', [Validators.required]],
            recordProof: ['', [Validators.required]],
        });
    }

    get createRecordControl() {
        return this.createRecordForm.controls;
    }

    saveRecord() {
        this.submitted = true;
        if (this.createRecordForm.valid) {
            this.record = {
                id: this._bookkeepService.generateRecordId(),
                statement_id: 0,
                description: this.createRecordForm.get('recordName')?.value,
                category: this.createRecordForm.get('recordType')?.value,
                amount: this.createRecordForm.get('recordAmount')?.value,
                proof:
                    'src/assets/mock-api/bookkeep-record-proof/' +
                    this.createRecordForm.get('recordProof')?.value,
                date: this.createRecordForm.get('recordDate')?.value,
            };

            // console.table(this.record);

            this._apiService.addRecord(this.record).subscribe(data => {
                // console.log(data);
                // console.table(this.createRecordForm.value);
            });

            this.router.navigate(['/bookkeep']);
        }
    }
}
