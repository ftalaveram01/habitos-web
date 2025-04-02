import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialHabitosService {

  constructor(private http: HttpClient) { }

  apiHistorialUrl = 'https://api-habbbits.vercel.app/historial';

  getHistorial(): Observable<any> {
    return this.http.get(`${this.apiHistorialUrl}`, { withCredentials: true })
  }

  createHistorial(id: number): Observable<any> {
    return this.http.post(`${this.apiHistorialUrl}/${id}`, null, { withCredentials: true })
  }

}
