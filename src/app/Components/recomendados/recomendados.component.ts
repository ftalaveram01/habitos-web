import { Component } from '@angular/core';
import { HabitosService } from '../../Services/habitos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recomendados',
  imports: [CommonModule],
  templateUrl: './recomendados.component.html',
  styleUrl: './recomendados.component.css'
})
export class RecomendadosComponent {

  habitos: any = [];

  constructor(private habitosService: HabitosService) { }

  ngOnInit(): void {
    this.habitosService.getHabitosRecomendados().subscribe((habitos: any) => {
      this.habitos = habitos;
    });
  }

}
