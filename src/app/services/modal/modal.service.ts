import { Injectable } from '@angular/core';
import { ModalBaseComponent } from 'src/app/components/modals/modal-base/modal-base.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    constructor() {}

    add(modal: ModalBaseComponent) {}

    close() {}

    remove(modal: ModalBaseComponent) {}
}
