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
}
