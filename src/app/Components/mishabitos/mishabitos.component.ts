import { Component } from '@angular/core';
import { HabitosService } from '../../Services/habitos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mishabitos',
  imports: [CommonModule],
  templateUrl: './mishabitos.component.html',
  styleUrl: './mishabitos.component.css'
})
export class MishabitosComponent {

  habitos: any = [];

  constructor(private habitosService: HabitosService) { }

  ngOnInit(): void {
    this.habitosService.getHabitos().subscribe((habitos: any) => {
      this.habitos = habitos;
    });
  }
}
