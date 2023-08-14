/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 14 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        This it the parent component for all modal components.

    PARAMETERS:
        _modalService -> used for the ng bootstrap modal service 

-------------------------------------------------------------------------------------------------*/

import { Component, Input, OnInit } from '@angular/core';
import { DeleteModalContentComponent } from '../delete-modal-content/delete-modal-content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-container',
    templateUrl: './modal-container.component.html',
    styleUrls: ['./modal-container.component.css'],
})
export class ModalContainerComponent {
    recordId!: number; // bookkeep record id

    constructor(private _modalService: NgbModal) {}

}
