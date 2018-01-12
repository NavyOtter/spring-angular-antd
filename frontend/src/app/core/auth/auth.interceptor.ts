import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = environment.apiUrl;
    let authReq = req.clone();

    this.authService = this.injector.get(AuthService);
    // only auth /api /management url
    if (req.url.startsWith(apiUrl + 'api') || req.url.startsWith(apiUrl + 'management')) {
      const token = this.authService.getToken();

      if (!!token) {
        authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        //authReq.headers.append('Authorization', 'Bearer ' + token);
      }

    }
    return next.handle(authReq).do(
      event => {
        if (event instanceof HttpResponse) {

        }
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.authService.logout().subscribe();
          }
        }
      }
    );
  }
}
