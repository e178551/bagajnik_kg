import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { SnotifyService } from 'ng-snotify';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private notufy: SnotifyService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            this.notufy.error('401 Unauthorized');
            location.reload(true);
          }
          const error = err.error || err.statusText;
          return throwError(error);
        }));
  }

}
