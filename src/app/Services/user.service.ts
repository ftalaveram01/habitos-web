import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUsuarioUrl = 'https://api-habbbits.vercel.app/usuarios'

  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUsuarioUrl}/datauser`, { withCredentials: true });
  }

  updateUserData(data: any): Observable<any> {

    const body = {
      nombre: data.nombre,
      email: data.email
    }

    return this.http.put(`${this.apiUsuarioUrl}`, body, { withCredentials: true });
  }
}
