import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitosService {

  constructor(private http: HttpClient) { }

  apiHabitosUrl = 'http://localhost:3000/habitos';

  getHabitosRecomendados(): Observable<any> {
    return this.http.get(`${this.apiHabitosUrl}/recomendados`);
  }
}
