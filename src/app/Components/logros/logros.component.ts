import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HistorialHabitosService } from '../../Services/historial-habitos.service';

@Component({
  selector: 'app-logros',
  imports: [CommonModule, FormsModule],
  templateUrl: './logros.component.html',
  styleUrl: './logros.component.css'
})
export class LogrosComponent implements OnInit {

  nombreFiltro: string = 'All';
  historial: any[] = [];
  nombresHistorial: any[] = [];
  historialMostrado: any[] = [];
  totalPoints: number = 0;

  constructor(private historialHabitosService: HistorialHabitosService) {
    this.historialHabitosService.getHistorial().subscribe((data) => {
      data = data.map((item: { fecha_registro: string | number | Date; }) => {
        const fecha = new Date(item.fecha_registro);
        item.fecha_registro = fecha.toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        return item;
      });
      this.historial = data;
      this.historialMostrado = data;
      this.nombresHistorial = [...new Set(data.map((item: { nombre: any; }) => item.nombre))];
      this.totalPoints = data.reduce((acumulador: any, actual: { puntuacion: any; }) => acumulador + actual.puntuacion, 0);
      if (this.totalPoints < 0) this.totalPoints = 0;
    });
  }

  ngOnInit() {
  }

  filtrarHistorial() {
    if (this.nombreFiltro == 'All') {
      this.historialMostrado = this.historial;
    } else {
      this.historialMostrado = this.historial.filter(h => h.nombre == this.nombreFiltro)
    }
  }

}
