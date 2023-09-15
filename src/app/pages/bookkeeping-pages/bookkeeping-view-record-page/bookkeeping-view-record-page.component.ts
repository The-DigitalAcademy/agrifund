/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 31 Jul 2023 
    UPDATED DATE: 04 Sept 2023 

    DESCRIPTION:
        Within this component record details data is fetched to for a user to view.
        A user can also select to edit a record's details or delete a record.

    PARAMETERS:
        _apiService - used to subscribe and call methods related to the api connection
        _bookkeepingService -> used to subscribe and call methods within the bookkeeping service
        _modalService -> used for connection to ng bootstrap modal service  
        route -> used to get id passed from a route
        id -> used to store the id of a record passed through the route
        record -> used to store the selected record fetched by id 
-------------------------------------------------------------------------------------------------*/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookkeepingDeleteModalContentComponent } from 'src/app/components/modal-components/bookkeeping-delete-modal-content/bookkeeping-delete-modal-content.component';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { IncomeStatementItemService } from 'src/app/_services/income-statement-item-service/income-statement-item.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-bookkeeping-view-record-page',
    templateUrl: './bookkeeping-view-record-page.component.html',
    styleUrls: ['./bookkeeping-view-record-page.component.css'],
})
export class BookkeepingViewRecordPageComponent implements OnInit, OnDestroy {
    // stores the income statement id
    recordId!: number;
    // stores the income statement record
    record!: IncomeStatementItem;
    // stores subscription for getting income statement item details
    private recordDetailsSubscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _incomeStatementItemService: IncomeStatementItemService,
        private _modalService: NgbModal
    ) {}

    ngOnInit() {
        // passes and assigns the id in the url path to the id variable
        this.getRecordDetails(
            (this.recordId = this.route.snapshot.params['id'])
        );
    }

    ngOnDestroy() {
        // unsubscribe from all subscriptions
        this.recordDetailsSubscription.unsubscribe();
    }

    // fetches the record based on its ID
    getRecordDetails(id: number) {
        this.recordDetailsSubscription = this._incomeStatementItemService
            .getIncomeStatementRecordById(id)
            .subscribe((record: IncomeStatementItem) => {
                this.record = record;
                if (this.record.category === 'Income') {
                    // displays income as money in
                    this.record.category = 'Money In';
                } else {
                    // displays expense as money out
                    this.record.category = 'Money Out';
                }

                // gets the last index of the slash to ensures that the record receipt name only appears
                const lastSlashIndex = record.proofOfReceipt.lastIndexOf('/');
                this.record.proofOfReceipt = record.proofOfReceipt.substring(
                    lastSlashIndex + 1
                );
            });
    }

    // displays the uploaded proof of a record in a new browser window
    viewProof(documentUrl: string) {
        window.open(documentUrl);
    }

    // routes to the edit details page by passing the record id
    editRecordDetails(recordId: number) {
        this.router.navigate(['bookkeeping/edit-record', this.recordId]);
    }

    // routes to delete page with the record id
    deleteRecord() {
        // sets that the main modal component should open and instance of the delete modal
        const modalRef = this._modalService.open(
            BookkeepingDeleteModalContentComponent
        );
        // assign the record id to the main modal component record id
        modalRef.componentInstance.recordId = this.recordId;
    }
}
