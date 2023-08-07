import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
    // a unique id for the type of modal to be displayed
    @Input() modalId!: string;
    isOpen = false;
    private element: any;

    constructor(
        private el: ElementRef,
        private _modalService: ModalService
    ) {
        this.element = el.nativeElement;
    }

    ngOnInit() {
        // add modal instance to the modal service so it can be opened from any component
        this._modalService.add(this);
        // move element to bottom of page before </body> so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: any) => {
            if (el.target.className === 'modal') {
                this.close();
            }
        });
    }

    ngOnDestroy() {
        // remove instance of modal from modal service
        this._modalService.remove(this);

        // remove modal element from html
        this.element.remove();
    }

    // when a modal is opened
    open() {
        // when opening a modal it is displayed in block format
        this.element.style.display = 'block';
        document.body.classList.add('modal-open');
        this.isOpen = true;
    }

    // when a modal is closed
    close() {
        this.element.style.display = 'none';
        document.body.classList.remove('modal-open');
        this.isOpen = false;
    }
}
