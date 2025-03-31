import { Component } from '@angular/core';
import { HabitosService } from '../../Services/habitos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private habitosService: HabitosService, private router: Router) { }

  ngOnInit(): void {
    this.habitosService.getHabitos().subscribe((habitos: any) => {
      this.habitos = habitos;
    });
  }

  crearHabito() {
    this.router.navigate(['/home/new']);
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
    this.habitosService.deleteHabito(this.idHabitoABorrar).subscribe();
    this.abrirModal = false;
    this.ngOnInit();
  }

}
