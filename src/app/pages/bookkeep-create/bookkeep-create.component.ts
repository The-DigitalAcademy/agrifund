import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IncomeStatementItem } from 'src/app/models/income-statement-item';

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
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.createRecordForm = this.fb.group({
            recordName: ['', [Validators.required]],
            recordType: ['', [Validators.required]],
            recordAmount: ['', [Validators.required]],
            recordProof: ['', [Validators.required]],
        });
    }

    saveRecord() {
        this.submitted = true;
        if (this.createRecordForm.valid) {


            console.table(this.createRecordForm.value);
        }
    }
}
