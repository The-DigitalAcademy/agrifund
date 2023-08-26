/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 17 Aug 2023 

    DESCRIPTION:
        This component is for the sidebar that is used for navigation.
        THe sidebar content will change based on the user state

    PARAMETERS:
    $userState -> stores the user state as an observable to keep the validity of a user token for a session

-------------------------------------------------------------------------------------------------*/

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/authentication-service/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    // stores the state of the user token
    userState$!: boolean;
    // stores the subscription to user service
    subscription!: Subscription;

    constructor(private _authService: AuthService) {}

    ngOnInit() {
        // sets the user state to the values stored int the observable within auth service
        this._authService.getUserState().subscribe(userState => {
            this.userState$ = userState;
        });
    }
}
