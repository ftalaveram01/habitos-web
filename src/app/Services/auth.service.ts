import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { LocalStorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  apiHabitosAuthUrl = 'https://api-habbbits.vercel.app/usuarios';

  constructor(private http: HttpClient, private router: Router, private localStorage: LocalStorageService) { }

  Login(username: string, password: string, onLogin: (ok: boolean, user?: any) => void) {

    const body = {
      email: username,
      password: password
    }

    this.http.post(`${this.apiHabitosAuthUrl}/login`, body, { withCredentials: true }).subscribe((users: any) => {
      if (users) {
        this.setAuthStatus(true);
        onLogin(true, users)
        console.log(users)
        localStorage.setItem('token', JSON.stringify(users.token));
      }
    },
      (error) => {
        if (error.status === 404) {
          onLogin(false, undefined)
        }
      }
    );
  }

  Register(user: any, onRegister: (ok: boolean) => void) {

    const usuario = {
      nombre: user.name,
      email: user.email,
      password: user.password
    }

    this.http.post(`${this.apiHabitosAuthUrl}/register`, usuario).subscribe((users: any) => {
      if (users) {
        onRegister(true)
      }
    },
      (error) => {
        if (error.status === 400) {
          onRegister(false)
        }
      }
    );
  }

  Logout() {
    this.setAuthStatus(false);
    this.localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  setAuthStatus(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }

  checkAuth(): Observable<boolean> {
    const token = this.localStorage.getItem('token');

    if (!token) {
      this.setAuthStatus(false);
      return of(false);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ isAuthenticated: boolean }>(
      `${this.apiHabitosAuthUrl}/verifyaccess`,
      { headers }
    ).pipe(
      map(response => {
        this.setAuthStatus(response.isAuthenticated);
        return response.isAuthenticated;
      }),
      catchError(error => {
        this.setAuthStatus(false);
        return of(false);
      })
    );
  }
}
