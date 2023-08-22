/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 14 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        Displays the delete modal dialog. The user can the confirm to delete a record.
        The id for a record is also passed to the bookkeep/api service to delete the record.

    PARAMETERS:
        _apiService - used to subscribe and call methods related to the api connection
        _bookkeepService -> used to subscribe and call methods within the bookkeep service
        recordId -> receives the record id from the parent modal container

-------------------------------------------------------------------------------------------------*/

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api/api.service';
import { BookkeepingService } from 'src/app/services/bookkeeping/bookkeeping.service';

@Component({
    selector: 'app-delete-modal-content',
    templateUrl: './delete-modal-content.component.html',
    styleUrls: ['./delete-modal-content.component.css'],
})
export class DeleteModalContentComponent {
    // receives the bookkeep record id from the parent modal component
    @Input() recordId!: number;

    constructor(
        private _apiService: ApiService,
        private _bookkeepingService: BookkeepingService,
        private activeModal: NgbActiveModal,
        private router: Router
    ) {}

    closeModal() {
        this.activeModal.close();
    }

    confirmedDelete() {
        console.log(this.recordId);

        this._apiService
            .deleteIncomeStatementItem(this.recordId)
            .subscribe((data: any) => {
                console.log(data);
                this.activeModal.close();
                this.router.navigate(['/bookkeeping']);
            });
    }
}
