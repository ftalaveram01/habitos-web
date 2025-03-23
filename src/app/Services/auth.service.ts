import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiHabitosAuthUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  Login(username: string, password: string, onLogin: (ok: boolean, user?: any) => void) {

    const body = {
      email: username,
      password: password
    }

    this.http.post(`${this.apiHabitosAuthUrl}/login`, body, { withCredentials: true }).subscribe((users: any) => {
      if (users) {
        console.log("LO QUE DEVUELVE LA API: ", users)
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
