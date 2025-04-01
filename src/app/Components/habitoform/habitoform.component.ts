import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitosService } from '../../Services/habitos.service';

@Component({
  selector: 'app-habitoform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habitoform.component.html',
  styleUrl: './habitoform.component.css'
})
export class HabitoformComponent implements OnInit, OnDestroy {

  form !: FormGroup;
  errors: { [nameError: string]: string } = {};
  nombre: string = '';
  descripcion: string = '';
  publico: boolean = false;
  recomendado: boolean = false;
  isCreado: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, private habitosService: HabitosService, private route: ActivatedRoute) {
    this.isCreado = !Boolean(this.route.snapshot.queryParamMap.get('update') === 'true');
  }

  ngOnInit(): void {

    if (localStorage.getItem('nombre') != null && localStorage.getItem('descripcion') != null) {
      this.nombre = String(localStorage.getItem('nombre')).replaceAll('"', '');
      this.descripcion = String(localStorage.getItem('descripcion')).replaceAll('"', '');
    }

    if (localStorage.getItem('publico') != null) {
      this.publico = localStorage.getItem('publico') === 'true'
    }

    console.log(this.publico)

    this.form = this.fb.group({
      nombre: [this.nombre, [Validators.min(1)]],
      descripcion: [this.descripcion, [Validators.min(1)]],
      intervalo: ['1', [Validators.min(1), Validators.max(999)]],
      frecuencia: [''],
      fechaInicio: [''],
      publico: [this.publico]
    });

  }

  ngOnDestroy(): void {
    if (this.nombre != '' || this.descripcion != '') {
      localStorage.removeItem('nombre')
      localStorage.removeItem('descripcion')
      localStorage.removeItem('publico')
    }
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
