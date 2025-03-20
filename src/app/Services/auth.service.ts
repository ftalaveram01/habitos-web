import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiHabitosAuthUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  Login(username: string, password: string, onLogin: (ok: boolean, user?: any) => void) {

    const params = new HttpParams()
      .set('email', username)
      .set('password', password);

    this.http.get(`${this.apiHabitosAuthUrl}/login`, { params }).subscribe((users: any) => {
      if (users) {
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
}
