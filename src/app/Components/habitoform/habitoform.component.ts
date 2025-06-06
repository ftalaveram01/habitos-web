import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitosService } from '../../Services/habitos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-habitoform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habitoform.component.html',
  styleUrl: './habitoform.component.css'
})
export class HabitoformComponent implements OnInit, OnDestroy {

  form !: FormGroup;
  errors: { [nameError: string]: string } = {};
  id!: number;
  nombre: string = '';
  descripcion: string = '';
  publico: boolean = false;
  recomendado: boolean = false;
  isCreado: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, private habitosService: HabitosService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.isCreado = !Boolean(this.route.snapshot.queryParamMap.get('update') === 'true');
  }

  ngOnInit(): void {

    if (localStorage.getItem('nombre') != null && localStorage.getItem('descripcion') != null) {
      this.nombre = String(localStorage.getItem('nombre')).replaceAll('"', '');
      this.descripcion = String(localStorage.getItem('descripcion')).replaceAll('"', '');
    }

    if (localStorage.getItem('publico') != null && localStorage.getItem('id')) {
      this.publico = localStorage.getItem('publico') === 'true'
      this.id = Number(localStorage.getItem('id'));
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
      localStorage.removeItem('id')
    }
  }

  onSubmit() {
    if (this.isCreado) {
      this.habitosService.createHabito(this.form.value).subscribe(res => {
        if (res.success) {
          this.toastr.info('Habbbit created', 'Created', { timeOut: 1000 })
          this.router.navigate(["/home"]);
        }
      });
    } else {
      this.habitosService.updateHabito(this.id, this.form.value).subscribe(res => {
        if (res.success) {
          this.toastr.info('Habbbit updated', 'Updated', { timeOut: 1000 })
          this.router.navigate(["/home"]);
        }
      });
    }
  }

}
