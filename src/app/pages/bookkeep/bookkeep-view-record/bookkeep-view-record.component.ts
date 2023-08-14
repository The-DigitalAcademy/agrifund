/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 31 Jul 2023 
    UPDATED DATE: 14 Aug 2023 

    DESCRIPTION:
        Within this component record details data is fetched to for a user to view.
        A user can also select to edit a record's details or delete a record.

    PARAMETERS:
        _apiService - used to subscribe and call methods related to the api connection
        _bookkeepService -> used to subscribe and call methods within the bookkeep service
        _modalService -> used for connection to ng bootstrap modal service  
        route -> used to get id passed from a route
        id -> used to store the id of a record passed through the route
        record -> used to store the selected record fetched by id 
-------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalContentComponent } from 'src/app/components/modal/delete-modal-content/delete-modal-content.component';
import { IncomeStatement } from 'src/app/models/IncomeStatement';
import { IncomeStatementItem } from 'src/app/models/IncomeStatementItem';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepService } from 'src/app/services/bookkeep/bookkeep.service';

@Component({
    selector: 'app-bookkeep-view-record',
    templateUrl: './bookkeep-view-record.component.html',
    styleUrls: ['./bookkeep-view-record.component.css'],
})
export class BookkeepViewRecordComponent implements OnInit {
    id!: any;
    record!: IncomeStatementItem;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _bookkeepService: BookkeepService,
        private _apiService: ApiService,
        private _modalService: NgbModal
    ) {}

    ngOnInit() {
        // passes and assigns the id in the url path to the id varable
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
        this.router.navigate(['bookkeep/edit-record', recordId]);
    }

    // routes to delete page with the record id
    deleteRecord(recordId: any) {
        // this.router.navigate(['bookkeep/delete-record', recordId]);

        // sets that the main modal component should open and instance of the delete modal
        const modalRef = this._modalService.open(DeleteModalContentComponent);
        // asign the record id to the main modal component record id
        modalRef.componentInstance.recordId = recordId;
    }
}
