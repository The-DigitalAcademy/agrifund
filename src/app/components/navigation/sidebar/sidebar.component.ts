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
import { Observable, Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    // stores the state of the user token
    userState$: Observable<string> | undefined;
    // stores the subscription to user service
    userSubscription!: Subscription;

    constructor(private _userService: UserServiceService) {}

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
}
