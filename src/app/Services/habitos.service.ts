import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitosService {

  constructor(private http: HttpClient) { }

  apiHabitosUrl = 'https://api-habbbits.vercel.app/habitos';

  getHabitosRecomendados(): Observable<any> {
    return this.http.get(`${this.apiHabitosUrl}/recomendados`);
  }

  getHabitos(): Observable<any> {
    return this.http.get(`${this.apiHabitosUrl}/usuario`, {
      withCredentials: true
    });
  }

  createHabito(habito: any): Observable<any> {
    return this.http.post(`${this.apiHabitosUrl}/usuario`, habito, {
      withCredentials: true
    });
  }
  
  updateHabito(habito: any): Observable<any> {
    return this.http.put(`${this.apiHabitosUrl}/usuario`, habito, {
      withCredentials: true
    });
  }

  deleteHabito(id: string): Observable<any> {
    return this.http.delete(`${this.apiHabitosUrl}/usuario/${id}`, {
      withCredentials: true
    });
  }

  getHabito(id: string): Observable<any> {
    return this.http.get(`${this.apiHabitosUrl}/usuario/${id}`, {
      withCredentials: true
    });
  }
}
