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
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/authentication-service/auth.service';
import { JWTTokenService } from 'src/app/_services/JWT-token-service/jwt-token.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(
        private _authService: AuthService,
        private _jwtService: JWTTokenService
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request);
    }
}
