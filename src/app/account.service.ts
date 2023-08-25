import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private loggedInStatus$ = new BehaviorSubject<boolean>(false);
    private currentUserName$ = new BehaviorSubject<string>('');

    constructor() {
        this.loggedInStatus$.next(false);
    }

    // Method to log in the user

    login(username: string) {
        this.loggedInStatus$.next(true);
        this.currentUserName$.next(username);
    }

    // Method to log out the user
    logout() {
        // Clear the user data when logging out
        this.loggedInStatus$.next(false);
        this.currentUserName$.next('');
    }

    // Observable to get the login state
    // get globalStateChanged(): Observable<{ loggedInStatus: boolean }> {
    //   return this.loggedInStatus$.asObservable();
    // }

    // Observable to get the current username
    get currentUserName(): Observable<string> {
        return this.currentUserName$.asObservable();
    }
}
