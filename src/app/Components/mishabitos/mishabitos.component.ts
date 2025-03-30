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

  constructor(private habitosService: HabitosService, private router: Router) { }

  ngOnInit(): void {
    this.habitosService.getHabitos().subscribe((habitos: any) => {
      this.habitos = habitos;
    });
  }

  crearHabito() {
    this.router.navigate(['/home/new']);
  }


}
