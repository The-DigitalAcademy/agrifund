/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 17 Aug 2023 

    DESCRIPTION:
        This component is for the navbar that is used for navigation toggling the sidebar and offcanvas.
        The username for a logged in user is displayed on the navbar.

    PARAMETERS:
    userState$ -> stores the user state as an observable to keep the validity of a user token for a session
    _offcanvasService -> calls the ngbootstrap offcanvas service
    offcanvas-> used to store the name of the offcanvas item that should be triggered
    _userService -> stores the subscription of the user service

-------------------------------------------------------------------------------------------------*/

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    // stores the state of the user token
    userState$: Observable<string> | undefined;
    // stores the subscription to user service
    userSubscription!: Subscription;
    // revers to the offcanvas html element
    @ViewChild('offcanvas', { static: true }) private offcanvas!: NgbOffcanvas;

    constructor(
        private _offcanvasService: NgbOffcanvas,
        private _userService: UserServiceService
    ) {}

    ngOnInit() {
        // get the user state value and stores it within the subscription
        this.userSubscription = this._userService
            .getUserState()
            .subscribe((userState: any) => {
                this.userState$ = userState;
                // console.log(userState);
            });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    // toggles the offcanvas visibility
    openOffcanvas() {
        this._offcanvasService.open(this.offcanvas, {
            backdrop: 'static',
            keyboard: false,
        });
    }

    closeOffcanvas() {
        this._offcanvasService.dismiss();
    }
}
