/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 23 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        This service controls the pages a user is authorized to access

    PARAMETERS:

         
-------------------------------------------------------------------------------------------------*/

import { Injectable, inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../authentication/auth.service';

// @Injectable({
//     providedIn: 'root',
// })
// export class AuthGuardService {}

// functional guard to check if user is logged in to access pages
export const isUserLoggedInGuard = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth) {
        // navigates to home page if the token is expired
        router.navigate(['']);
    }
    return auth.getUserState();
};

export function authenticationGuard(redirectRoute: string): CanActivateFn {
    return () => {
        const _authService: AuthService = inject(AuthService);
        const router = inject(Router);

        return (
            _authService.getUserState() || router.createUrlTree([redirectRoute])
        );
    };
}

// TODO ADMIN GUARD
// TODO FARMER GUARD
