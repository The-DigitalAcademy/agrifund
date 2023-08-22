/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 14 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        This it the parent modal container component for all modal content components.

    PARAMETERS:
        recordId: number stores the id of the record to be passed to a modal component
        _modalService -> used for the ng bootstrap modal service 

-------------------------------------------------------------------------------------------------*/

import { Component, Input, OnInit } from '@angular/core';
import { BookkeepingDeleteModalContentComponent } from '../bookkeeping-delete-modal-content/bookkeeping-delete-modal-content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-container',
    templateUrl: './modal-container.component.html',
    styleUrls: ['./modal-container.component.css'],
})
export class ModalContainerComponent {
    recordId!: number; // bookkeeping record id

    constructor(private _modalService: NgbModal) {}
}
