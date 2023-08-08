import {
    Component,
    ViewEncapsulation,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-modal-base',
    templateUrl: './modal-base.component.html',
    styleUrls: ['./modal-base.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalBaseComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    isOpen = false;
    private element: any;

    constructor(
        private _modalService: ModalService,
        private el: ElementRef
    ) {
        this.element = el.nativeElement;
    }

    ngOnInit() {
        // add self (this modal instance) to the modal service so it can be opened from any component
        this._modalService.add(this);

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: any) => {
            if (el.target.className === 'modal') {
                this.close();
            }
        });
    }

    ngOnDestroy() {
        // remove self from modal service
        this._modalService.remove(this);

        // remove modal element from html
        this.element.remove();
    }

    open() {
        this.element.style.display = 'block';
        document.body.classList.add('modal-open');
        this.isOpen = true;
    }

    close() {
        this.element.style.display = 'none';
        document.body.classList.remove('modal-open');
        this.isOpen = false;
    }
}
