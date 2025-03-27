import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUsuarioUrl = 'http://localhost:3000/usuarios'

  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUsuarioUrl}/datauser`, { withCredentials: true });
  }
}
