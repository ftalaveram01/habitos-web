import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitosService } from '../../Services/habitos.service';

@Component({
  selector: 'app-habitoform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habitoform.component.html',
  styleUrl: './habitoform.component.css'
})
export class HabitoformComponent {

  form !: FormGroup;
  errors: { [nameError: string]: string } = {};

  constructor(private router: Router, private fb: FormBuilder, private habitosService: HabitosService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [''],
      descripcion: [''],
      intervalo: ['1', [Validators.min(1), Validators.max(999)]],
      frecuencia: [''],
      fechaInicio: [''],
      publico: ['']
    });
  }

  onSubmit() {
    this.habitosService.createHabito(this.form.value).subscribe(res => {
      if (res.success) {
        alert('Habbbit correctly created');
        this.router.navigate(["/home"]);
      }
    });
  }
}
