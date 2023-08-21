/* ------------------------------------------------------------------------------------------------
    AUTHOR: Monique
    CREATE DATE: 21 Aug 2023 
    UPDATED DATE: 

    DESCRIPTION:
        Used to modify all http requests

    PARAMETERS:
         
-------------------------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        request = request.clone({
            // adds the below to each http request
            withCredentials: true,
        });
        // forward the http request to the handle after it has been changed
        return next.handle(request);
    }
}

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true,
    },
];
