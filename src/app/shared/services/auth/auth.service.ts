import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { AuthResponseData, User } from '../../models';
import { api } from 'src/app/config/api';

const USER_AUTH_COOKIE = 'user_auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(USER_AUTH_COOKIE)!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public register(username: string, password: string): Observable<void | string | Error> {
    return this.httpClient
      .post(
        api.auth.register,
        {
          username,
          password
        },
        { responseType: 'text' }
      )
      .pipe(
        tap((responseData) => {
          console.debug('ResponseData', responseData);
        }),
        catchError(this.handleError)
      );
  }

  public login(username: string, password: string): Observable<void | AuthResponseData | Error> {
    return this.httpClient
      .post<AuthResponseData>(api.auth.login, {
        username,
        password
      })
      .pipe(
        tap((responseData: AuthResponseData) => {
          console.log('[DEBUG] what is the responseData', responseData);
          this.handleAuthentication(responseData.id, responseData.username, responseData.token);
        }),
        catchError(this.handleError)
      );
  }

  public logout() {
    localStorage.removeItem(USER_AUTH_COOKIE);
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(id: string, username: string, token: string) {
    const user: User = { id, username, token };
    console.debug('[DEBUG-AUTH-SERVICE] new User', user);
    localStorage.setItem(USER_AUTH_COOKIE, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<Error> {
    console.debug('What is the errorResponse?', errorResponse);
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.message) {
      return throwError(() => new Error(errorMessage));
    }

    if (errorResponse.error) {
      errorMessage = errorResponse.error;
    }
    return throwError(() => new Error(errorMessage));
  }
}
