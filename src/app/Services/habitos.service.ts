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

    let horas

    if (habito.frecuencia == "per-hours") horas = Number(habito.intervalo);
    else horas = Number(habito.intervalo) * 24

    const body = {
      "nombre": habito.nombre,
      "descripcion": habito.descripcion,
      "creadoEn": new Date().toISOString().slice(0, 19),
      "publico": habito.publico,
      "horasIntervalo": horas,
      "fechaInicio": new Date(habito.fechaInicio).toISOString().replace('Z', '').slice(0, 19)
    }

    console.log(body)

    return this.http.post(`${this.apiHabitosUrl}`, body, {
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
