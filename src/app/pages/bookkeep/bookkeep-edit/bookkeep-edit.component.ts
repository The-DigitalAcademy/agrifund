import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            recordName: [this.record.description, [Validators.required]],
            recordType: [this.record.category, [Validators.required]],
            recordAmount: [this.record.amount, [Validators.required]],
            recordProof: ['', [Validators.required]],
        });
    }

    getRecordDetails(id: any) {
        this._apiService
            .getStatementItemById(this.id)
            .subscribe((data: any) => {
                this.record = data;
            });
    }

    viewRecordDetails(recordId: any) {
        // console.log(recordId);
        this.router.navigate(['bookkeep/view-record', recordId]);
    }

    saveRecord() {
        this.submitted = true;
        if (this.editRecordForm.valid) {
            // this.record = {
            //     id: this._bookkeepService.generateId(),
            //     statement_id: 0,
            //     description: this.editRecordForm.get('recordName')?.value,
            //     category: this.editRecordForm.get('recordType')?.value,
            //     amount: this.editRecordForm.get('recordAmount')?.value,
            //     proof:
            //         'src/assets/mock-api/bookkeep-record-proof/' +
            //         this.editRecordForm.get('recordProof')?.value,
            // };
            // console.table(this.record);
            // this._apiService.addRecord(this.record).subscribe(data => {
            //     console.log(data);
            //     console.table(this.editRecordForm.value);
            // });
            // this.router.navigate(['/bookkeep']);
        }
    }
}
