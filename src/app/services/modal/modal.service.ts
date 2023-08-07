import { Injectable } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private modals: ModalComponent[] = [];

    constructor() {}

    add(modal: ModalComponent) {
        // ensure component has a unique id attribute
        if (!modal.modalId || this.modals.find(x => x.modalId === x.modalId)) {
            throw new Error('modal must have a unique id attribute');
        }

        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(modal: ModalComponent) {
        this.modals = this.modals.filter(x => x !== modal);
    }

    // open a model by id
    open(id: string) {
        const modal = this.modals.find(x => x.modalId === id);

        if (!modal) {
            throw new Error(`modal '${id}' not found`);
        }

        modal.open();
    }

    // close a modal that is currently open
    close() {
        const modal = this.modals.find(x => x.isOpen);
        modal?.close();
    }
}
