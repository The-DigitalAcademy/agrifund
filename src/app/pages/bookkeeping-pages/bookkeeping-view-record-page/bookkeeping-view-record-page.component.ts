/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 31 Jul 2023 
    UPDATED DATE: 14 Aug 2023 

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookkeepingDeleteModalContentComponent } from 'src/app/components/modal-components/bookkeeping-delete-modal-content/bookkeeping-delete-modal-content.component';
import { IncomeStatementItem } from 'src/app/_models/IncomeStatementItem';
import { ApiService } from 'src/app/_services/api-service/api.service';
import { BookkeepingService } from 'src/app/_services/bookkeeping-service/bookkeeping.service';

@Component({
    selector: 'app-bookkeeping-view-record-page',
    templateUrl: './bookkeeping-view-record-page.component.html',
    styleUrls: ['./bookkeeping-view-record-page.component.css'],
})
export class BookkeepingViewRecordPageComponent implements OnInit {
    id!: any;
    record!: IncomeStatementItem;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _bookkeepingService: BookkeepingService,
        private _apiService: ApiService,
        private _modalService: NgbModal
    ) {}

    ngOnInit() {
        // passes and assigns the id in the url path to the id variable
        this.getRecordDetails((this.id = this.route.snapshot.params['id']));
    }

    // fetches the record based on its ID
    getRecordDetails(id: any) {
        this._apiService
            .getStatementItemById(this.id)
            .subscribe((data: any) => {
                this.record = data;
            });
    }

    // displays the uploaded proof of a record in a new browser window
    viewProof(documentUrl: string) {}

    // routes to the edit details page by passing the record id
    editRecordDetails(recordId: any) {
        this.router.navigate(['bookkeeping/edit-record', recordId]);
    }

    // routes to delete page with the record id
    deleteRecord(recordId: any) {
        // sets that the main modal component should open and instance of the delete modal
        const modalRef = this._modalService.open(
            BookkeepingDeleteModalContentComponent
        );
        // assign the record id to the main modal component record id
        modalRef.componentInstance.recordId = recordId;
    }
}
