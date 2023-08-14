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

import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-delete-modal-content',
    templateUrl: './delete-modal-content.component.html',
    styleUrls: ['./delete-modal-content.component.css'],
})
export class DeleteModalContentComponent implements OnInit {
    // receives the bookkeep record id from the parent modal component
    @Input() recordId!: number;
    constructor(private _apiService: ApiService) {}

    ngOnInit() {
        // console.log(this.recordId);
    }
}
