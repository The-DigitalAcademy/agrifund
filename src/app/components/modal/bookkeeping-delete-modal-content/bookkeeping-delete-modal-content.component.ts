/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 14 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        Displays the delete modal dialog. The user can the confirm to delete a record.
        The id for a record is also passed to the bookkeeping/api service to delete the record.

    PARAMETERS:
        _apiService: ApiService - used to subscribe and call methods related to the api connection
        _bookkeepingService: BookkeepingService -> used to subscribe and call methods within the bookkeeping service
        recordId: number -> receives the record id from the parent modal container
        router: Router -> used to route to another page

-------------------------------------------------------------------------------------------------*/

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepingService } from 'src/app/services/bookkeeping/bookkeeping.service';

@Component({
    selector: 'app-delete-modal-content',
    templateUrl: './bookkeeping-delete-modal-content.component.html',
    styleUrls: ['./bookkeeping-delete-modal-content.component.css'],
})
export class BookkeepingDeleteModalContentComponent {
    // receives the bookkeeping record id from the parent modal component
    @Input() recordId!: number;

    constructor(
        private _apiService: ApiService,
        private _bookkeepingService: BookkeepingService,
        private activeModal: NgbActiveModal,
        private router: Router
    ) {}

    // closes the modal
    closeModal() {
        this.activeModal.close();
    }

    // after a user confirms the delete by clicking yes, the id of a record is passed to the api service
    confirmedDelete() {
        this._apiService
            .deleteIncomeStatementItem(this.recordId)
            .subscribe((message: unknown) => {
                console.log(message);
                // closes the modal after the record is deleted
                this.activeModal.close();
                // routes back to bookkeeping view all page after deletion
                this.router.navigate(['/bookkeeping']);
            });
    }
}
