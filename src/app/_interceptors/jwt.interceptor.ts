import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthenticationService } from '../_Services/authentication.service';
import { UserAuth } from '../models/userAuth';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser = this.authService.currentUserSubject.value;

    this.authService.currentUser
      .pipe(take(1))
      .subscribe((user) => (currentUser = user));

      if (currentUser) {
        request = request.clone({
          setHeaders: {
           Authorization: `Bearer ${currentUser.token}`
          }
        })
      }

    return next.handle(request);
  }
}
