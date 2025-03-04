import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiHabitosAuthUrl = 'http://localhost:8080/rest/usuarios';  

  constructor(private http: HttpClient) { }

  Login(username: string, password: string, onLogin: (ok: boolean, user?:any) => void){
    
    const params = new HttpParams()
      .set('email', username)
      .set('password', password);

    this.http.get(`${this.apiHabitosAuthUrl}/login`, {params}).subscribe((users :any) => {
        if(users){
          onLogin(true,users)
        }
      },
      (error) => {
        if(error.status === 404){
          onLogin(false, undefined)
        }
      }
    );
  }

  Register(user: any, onRegister: (ok: boolean) => void){
    const params = new HttpParams()
      .set('name', user.name)
      .set('email', user.email)
      .set('password', user.password);

    this.http.post(`${this.apiHabitosAuthUrl}/register`, params).subscribe((users :any) => {
        if(users){
          onRegister(true)
        }
      },
      (error) => {
        if(error.status === 400){
          onRegister(false)
        }
      }
    );
  }
}
