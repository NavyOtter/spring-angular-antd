import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let url = req.url;
    let authReq = req.clone();

    if (!url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('assets/')) {
      url = environment.SERVER_URL + url;

      this.authService = this.injector.get(AuthService);
      const token = this.authService.getToken();

      if (!!token) {
        authReq = req.clone({ url: url, setHeaders: { Authorization: 'Bearer ' + token } });
      } else {
        authReq = req.clone({ url: url });
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
