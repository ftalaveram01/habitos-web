import { Component } from '@angular/core';
import { HabitosService } from '../../Services/habitos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HistorialHabitosService } from '../../Services/historial-habitos.service';

@Component({
  selector: 'app-mishabitos',
  imports: [CommonModule],
  templateUrl: './mishabitos.component.html',
  styleUrl: './mishabitos.component.css'
})
export class MishabitosComponent {

  habitos: any = [];
  idHabitoABorrar!: Number;
  abrirModal = false;

  constructor(private habitosService: HabitosService, private historialService: HistorialHabitosService, private router: Router) {
    this.habitosService.getHabitos().subscribe((habitos: any) => {
      this.habitos = habitos;
    });
  }

  ngOnInit() {
  }

  crearHabito() {
    this.router.navigate(['/home/new']);
  }

  updateHabito(id: any, nombre: string, descripcion: string, publico: boolean) {
    localStorage.setItem('id', id);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('descripcion', descripcion);
    localStorage.setItem('publico', String(publico));
    this.router.navigate(['/home/new'], { queryParams: { update: 'true' } });
  }

  doneHabito(id: number) {
    this.historialService.createHistorial(id).subscribe(response => {
      if (response.success) {
        alert('Habbbit done!')
      }
    });
  }

  deleteTemporal(id: any) {
    this.abrirModal = true;
    this.idHabitoABorrar = Number(id);
  }

  cerrarModal() {
    this.abrirModal = false
    this.idHabitoABorrar = -1;
  }

  deleteHabito() {
    this.habitosService.deleteHabito(this.idHabitoABorrar).subscribe(() => {
      this.habitos = this.habitos.filter((habito: any) => habito.id !== this.idHabitoABorrar);
    });
    this.abrirModal = false;
  }

}
