/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 16 Aug 2023 

    DESCRIPTION:
        This component is for the navbar that is used for navigation toggling the sidebar and offcanvas.
        The username for a logged in user is displayed on the navbar.

    PARAMETERS:
    $userState -> stores the user state as an observable to keep the validity of a user token for a session
    _offcanvasService -> calls the ngbootstrap offcanvas service

-------------------------------------------------------------------------------------------------*/

import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    $userState!: any;

    constructor(private _offcanvasService: NgbOffcanvas) {}

    ngOnInit() {
        this.$userState = 'authenticated';
        // this.$userState = null;
    }

    // toggles the offcanvas visibility
    openOffcanvas(content: TemplateRef<any>) {
        this._offcanvasService.open(content, {
            backdrop: 'static',
            keyboard: false,
        });
    }
}
