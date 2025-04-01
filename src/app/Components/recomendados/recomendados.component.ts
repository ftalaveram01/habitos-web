import { Component } from '@angular/core';
import { HabitosService } from '../../Services/habitos.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../Services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendados',
  imports: [CommonModule],
  templateUrl: './recomendados.component.html',
  styleUrl: './recomendados.component.css'
})
export class RecomendadosComponent {

  habitos: any = [];

  constructor(private habitosService: HabitosService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.habitosService.getHabitosRecomendados().subscribe((habitos: any) => {
      this.habitos = habitos;
    });
  }

  btnUsar(nombre: string, descripcion: string) {
    this.localStorage.setItem('nombre', nombre);
    this.localStorage.setItem('descripcion', descripcion);
    this.router.navigate(['/home/new'], { queryParams: { isRecomendado: true } })
  }

}
