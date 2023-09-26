import { IncomeStatementService } from 'src/app/_services/income-statement-service/income-statement.service';
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
import { IncomeStatementItemService } from 'src/app/_services/income-statement-item-service/income-statement-item.service';

@Component({
    selector: 'app-bookkeeping-create-page',
    templateUrl: './bookkeeping-create-page.component.html',
    styleUrls: ['./bookkeeping-create-page.component.css'],
})
export class BookkeepingCreatePageComponent implements OnInit {
    createRecordForm!: FormGroup;
    submitted = false;
    // stores the category types of a bookkeeping record
    recordType = ['Money In', 'Money Out'];

    // creates an empty instance of an income statement item to store the created record
    record: IncomeStatementItem = {
        id: 0,
        statementId: 0,
        category: '',
        amount: 0,
        proofOfReceipt: '',
        description: '',
        date: '',
    };
    // stores the file name for an uploaded file
    fileName = 'No file uploaded yet.';
    // stores the file to bue uploaded
    fileToUpload!: File;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private _apiService: ApiService,
        private _incomeStatementItemService: IncomeStatementItemService,
        private _incomeStatementService: IncomeStatementService
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
        this.createRecordForm.controls['recordProof'].setValue(this.fileName);
    }

    get createRecordControl() {
        return this.createRecordForm.controls;
    }

    // when the an a new file has been uploaded
    onFileChange(event: any) {
        // sets the file to be uploaded to the selected file
        this.fileToUpload = event.target.files[0];
        // sets the file name to the uploaded files name
        this.fileName = this.fileToUpload.name;
        // sets the value for a record name
        this.createRecordForm.controls['recordProof'].setValue(this.fileName);
    }

    // check if income statement exists for a year, if not it will be created
    checkIfStatementExistsForRecord(recordDate: string) {
        // converts the record sting value to a date
        const recordDateValue = new Date(recordDate);
        // if statement doesn't exists for the year -> new one will be created and set
        if (
            this._incomeStatementService.statementExistsForFinancialYear(
                recordDateValue
            )
        ) {
            console.log(`Statement exist!`);
        } else {
            // creates a new income statement for the the date
            this._incomeStatementService.createIncomeStatement(recordDateValue);
        }
    }

    // used to save a new bookkeeping record
    saveRecord() {
        this.submitted = true;
        // creates a reusable variable to extract create form input value
        const formInputVal = this.createRecordForm.value;
        if (
            this.createRecordForm.valid &&
            this.fileName != 'No file uploaded yet.'
        ) {
            // adds the form data the the record object instance of incomeStatementItem
            this.record = {
                id: 0,
                statementId: 0,
                description: formInputVal.recordName,
                category: formInputVal.recordType,
                amount: formInputVal.recordAmount,
                proofOfReceipt: this.fileName,
                date: formInputVal.recordDate,
            };

            this.checkIfStatementExistsForRecord(this.record.date);

            // sends the new record data to the income statement item service
            this._incomeStatementItemService.createNewRecord(
                this.record,
                this.fileToUpload
            );
        }
    }
}
