import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { User } from '../user/user';
// import { MenuService } from '../menu/menu.service';


@Injectable()
export class AuthService {

  public static readonly TOKEN_KEY = 'authenticationToken';

  principal: User;
  authenticated = false;
  authenticationState = new Subject<User>();

  // private menuService: MenuService;

  constructor(
    private injector: Injector,
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) { }

  getToken(): string {
    return this.localStorage.retrieve(AuthService.TOKEN_KEY) || this.sessionStorage.retrieve(AuthService.TOKEN_KEY);
  }


  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      this.localStorage.store(AuthService.TOKEN_KEY, jwt);
    } else {
      this.sessionStorage.store(AuthService.TOKEN_KEY, jwt);
    }
  }

  login(credentials): Observable<any> {
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };

    return this.http.post(`api/authenticate`, data, { observe: 'response' }).pipe(
      map(resp => {
        const bearerToken = resp.headers.get('Authorization');
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          this.storeAuthenticationToken(jwt, credentials.rememberMe);
          return jwt;
        }
      }),
      tap(
        jwt => {
          this.getPrincipal(true).subscribe(
            (principal) => {

              // this.menuService = this.injector.get(MenuService);
              // this.menuService.resume();

            }
          );
        }
      )
    );
  }

  loginWithToken(jwt, rememberMe): Observable<any> {

    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return of(jwt);
    } else {
      return Observable.throw('jwt_required');
    }
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      this.localStorage.clear(AuthService.TOKEN_KEY);
      this.sessionStorage.clear(AuthService.TOKEN_KEY);
      this.authenticate(null);
      observer.complete();
    });
  }

  getAccount(): Observable<User> {
    return this.http.get(`api/account`);
  }

  updateAccount(user: User): Observable<User> {
    return this.http.post(`api/account`, user);
  }

  getPrincipal(force?: boolean): Observable<User> {
    if (force === true) {
      this.principal = undefined;
    }

    if (this.principal) {
      return of(this.principal);
    }

    return this.getAccount().pipe(
      map(
        (account) => {
          if (account) {
            this.authenticate(account);
          } else {
            this.authenticate(null);
          }
          return this.principal;
        },
        (error) => {
          this.authenticate(null);
          return null;
        }
      )
    );
  }

  hasAuthorityDirect(authority: string): boolean {
    if (!this.authenticated || !this.principal || !this.principal.authorities) {
      return false;
    }

    return this.principal.authorities && this.principal.authorities.includes(authority);
  }

  hasAuthority(authority: string): Observable<boolean> {
    if (!this.authenticated) {
      return of(false);
    }
    return this.getPrincipal().pipe(
      map((principal) => {
        return principal.authorities && principal.authorities.includes(authority);
      }, () => {
        return false;
      })
    );
  }

  hasAnyAuthorityDirect(authorities: string[]): boolean {
    if (!this.authenticated || !this.principal || !this.principal.authorities) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this.principal.authorities.includes(authorities[i])) {
        return true;
      }
    }
    return false;
  }

  hasAnyAuthority(authorities: string[]): Observable<boolean> {
    if (!this.authenticated) {
      return of(false);
    }
    return this.getPrincipal().pipe(
      map((principal) => {
        if (!principal.authorities) {
          return false;
        }
        for (let i = 0; i < authorities.length; i++) {
          if (principal.authorities.includes(authorities[i])) {
            return true;
          }
        }
        return false;
      }, () => {
        return false;
      })
    );
  }

  isPrincipalResolved(): boolean {
    return this.principal !== undefined;
  }

  authenticate(principal: User) {
    this.principal = principal;
    this.authenticated = principal !== null;
    this.authenticationState.next(this.principal);
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getAuthenticationState(): Observable<User> {
    return this.authenticationState.asObservable();
  }
}
