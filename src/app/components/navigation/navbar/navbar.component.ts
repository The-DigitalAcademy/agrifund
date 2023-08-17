/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 17 Aug 2023 

    DESCRIPTION:
        This component is for the navbar that is used for navigation toggling the sidebar and offcanvas.
        The username for a logged in user is displayed on the navbar.

    PARAMETERS:
    $userState -> stores the user state as an observable to keep the validity of a user token for a session
    _offcanvasService -> calls the ngbootstrap offcanvas service
    offcanvas-> used to store the name of the offcanvas item that should be triggered
    _userService -> stores the subscription of the user service

-------------------------------------------------------------------------------------------------*/

import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    // stores the state of the user login=
    userState$: Observable<string> | undefined;

    constructor(
        private _offcanvasService: NgbOffcanvas,
        private _userService: UserServiceService
    ) {}

    ngOnInit() {
        // sets the user stat for testing purposes
        // this.$userState = 'authenticated';
        this._userService.getUserState().subscribe((userState: any) => {
            this.userState$ = userState;
            console.log(userState);
        });
    }

    // toggles the offcanvas visibility
    openOffcanvas(content: TemplateRef<any>) {
        this._offcanvasService.open(content, {
            backdrop: 'static',
            keyboard: false,
        });
    }
}
