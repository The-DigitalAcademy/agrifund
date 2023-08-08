import {
    Component,
    ViewEncapsulation,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
} from '@angular/core';

@Component({
    selector: 'app-modal-base',
    templateUrl: './modal-base.component.html',
    styleUrls: ['./modal-base.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalBaseComponent {}
