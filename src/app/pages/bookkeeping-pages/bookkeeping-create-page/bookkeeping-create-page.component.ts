/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 04 Aug 2023 
    UPDATED DATE: 29 Aug 2023 

    DESCRIPTION:
        This file manages the capture of a new bookkeeping record's data and passes it to the  
        bookkeeping service to be passed to the api.


    PARAMETERS:
        
-------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { BookkeepingService } from 'src/app/_services/bookkeeping-service/bookkeeping.service';

@Component({
    selector: 'app-bookkeeping-create-page',
    templateUrl: './bookkeeping-create-page.component.html',
    styleUrls: ['./bookkeeping-create-page.component.css'],
})
export class BookkeepingCreatePageComponent implements OnInit {
    createRecordForm!: FormGroup;
    submitted = false;
    recordType: any = ['Money In', 'Money Out'];

    // creates an empty instance of an income statement item to store the created record
    record: IncomeStatementItem = {
        id: 0,
        statement_id: 0,
        category: '',
        amount: 0,
        proof: '',
        description: '',
        date: '',
    };
    // stores the file name for an uploaded file
    fileName = '';
    // stores the file to bue uploaded
    fileToUpload!: File;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _apiService: ApiService,
        private _bookkeepingService: BookkeepingService
    ) {}

    ngOnInit() {
        // on initialization the form croup is created
        this.createRecordForm = this.fb.group({
            recordName: ['', [Validators.required]],
            recordType: ['', [Validators.required]],
            recordAmount: ['', [Validators.required]],
            recordProof: ['', [Validators.required]],
            recordDate: ['', [Validators.required]],
        });

        // disabled the file upload input from accepting user input
        this.createRecordForm.controls['recordProof'].disable();
        // sets the value for a record name
        this.createRecordForm.controls['recordProof'].setValue(
            this.getRecordProofFileName()
        );
    }

    getRecordProofFileName() {
        const formInputVal = this.createRecordForm.value;
        if (!formInputVal.recordProof) {
            return 'No file uploaded yet.';
        } else {
            return this.fileName;
        }
    }

    get createRecordControl() {
        return this.createRecordForm.controls;
    }

    onFileChange(event: any) {
        console.log(event.target.files[0]);
        this.fileToUpload = event.target.files[0];

        // sets the file name to the uploaded files name
        this.fileName = this.fileToUpload.name;
        console.log(this.fileName);

        // sets the value for a record name
        this.createRecordForm.controls['recordProof'].setValue(
            this.getRecordProofFileName()
        );
    }

    // used to save a new bookkeeping record
    saveRecord() {
        this.submitted = true;
        // creates a reusable variable to extract create form input value
        const formInputVal = this.createRecordForm.value;
        if (this.createRecordForm.valid) {
            // adds the form data the the record object instance of incomeStatementItem
            this.record = {
                id: 0,
                statement_id: 0,
                description: formInputVal.recordName,
                category: formInputVal.recordType,
                amount: formInputVal.recordAmount,
                proof: formInputVal.recordProof,
                date: formInputVal.recordDate,
            };

            // console.table(this.record);

            this._apiService.addRecord(this.record).subscribe(data => {
                // adds the new record to the observable array after successfully adding the record
                this._bookkeepingService.addRecord(this.record);
            });
        }
    }
}
