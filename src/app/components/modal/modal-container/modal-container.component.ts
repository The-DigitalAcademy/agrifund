import { Component } from '@angular/core';
import { DeleteModalContentComponent } from '../delete-modal-content/delete-modal-content.component';

@Component({
    selector: 'app-modal-container',
    templateUrl: './modal-container.component.html',
    styleUrls: ['./modal-container.component.css'],
})
export class ModalContainerComponent {
    constructor(private deleteModal: DeleteModalContentComponent) {}
}
