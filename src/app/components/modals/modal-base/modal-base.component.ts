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
        this.element = el;
    }

    ngOnInit() {}

    ngOnDestroy() {}
}
