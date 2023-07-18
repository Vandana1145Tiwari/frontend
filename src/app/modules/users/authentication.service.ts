import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Constants } from "src/app/constants";

@Injectable({
    providedIn: 'root',
  })
  export class AuthenticationService {
    private isAuthenticated = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticated.asObservable();
    constructor(private http: HttpClient) { }
    login(userName: string, password: string): Observable<boolean> {
        const body = {
            userName: userName,
            password: password
        }
        return this.http
          .post<boolean>(`${Constants.apiBaseUrl}/user/authenticate`, body);
      }
    
    setAuthenticateStatus(isAuthenticated: boolean) {
      this.isAuthenticated.next(isAuthenticated);
    }
  }