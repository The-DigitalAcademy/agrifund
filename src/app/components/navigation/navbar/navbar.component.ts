import { Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
    // userState: String = 'notLoggedIn';

    constructor(private _offcanvasService: NgbOffcanvas) {}

    // toggles the offcanvas visibility
    openOffcanvas(content: TemplateRef<any>) {
        this._offcanvasService.open(content, {
            backdrop: 'static',
            keyboard: false,
        });
    }
}
