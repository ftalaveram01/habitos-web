import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  apiHabitosAuthUrl = 'https://api-habbbits.vercel.app/usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  Login(username: string, password: string, onLogin: (ok: boolean, user?: any) => void) {

    const body = {
      email: username,
      password: password
    }

    this.http.post(`${this.apiHabitosAuthUrl}/login`, body, { withCredentials: true }).subscribe((users: any) => {
      if (users) {
        this.setAuthStatus(true);
        onLogin(true, users)
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
    this.http.get(`${this.apiHabitosAuthUrl}/logout`, { withCredentials: true }).subscribe(() => {
      this.setAuthStatus(false);
      this.router.navigate(['/']);
    });
  }

  setAuthStatus(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }

  checkAuth(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiHabitosAuthUrl}/verifyaccess`, {
      withCredentials: true
    }).pipe(
      map(response => {
        this.isAuthenticatedSubject.next(response.isAuthenticated);
        return response.isAuthenticated;
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }
}
