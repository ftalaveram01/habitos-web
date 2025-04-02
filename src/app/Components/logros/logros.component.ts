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

  constructor(private historialHabitosService: HistorialHabitosService) {
    this.historialHabitosService.getHistorial().subscribe((data) => {
      this.historial = data;
      this.historialMostrado = data;
      this.nombresHistorial = [...new Set(data.map((item: { nombre: any; }) => item.nombre))];
    })
  }

  ngOnInit(): void {

  }

  filtrarHistorial() {
    if (this.nombreFiltro == 'All') {
      this.historialMostrado = this.historial;
    } else {
      this.historialMostrado = this.historial.filter(h => h.nombre == this.nombreFiltro)
    }
  }

}
