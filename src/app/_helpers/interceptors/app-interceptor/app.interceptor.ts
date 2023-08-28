/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique Nagel
    CREATE DATE: 27 Aug 2023
    UPDATED DATE: 

    DESCRIPTION:
     This interceptor file is used to append the jwt to api requests to validate requests

    PARAMETERS:

-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from 'src/app/_services/authentication-service/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        const token = this._authService.getSessionToken();

        // checks if token value is valid
        if (token) {
            request = request.clone({
                url: request.url,
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(request);
    }
}
