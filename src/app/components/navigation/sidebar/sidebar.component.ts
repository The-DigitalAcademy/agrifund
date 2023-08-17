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

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    userState$!: any;

    ngOnInit() {
        // sets the user stat for testing purposes
        this.userState$ = 'authenticated';
        // this.$userState = null;
    }
}
