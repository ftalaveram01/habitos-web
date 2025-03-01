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
        if(error.status === 400){
          onLogin(false, undefined)
        }
      }
    );
  }
}
