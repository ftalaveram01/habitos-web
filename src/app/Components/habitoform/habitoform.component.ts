import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habitoform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habitoform.component.html',
  styleUrl: './habitoform.component.css'
})
export class HabitoformComponent {

  form !: FormGroup;
  errors: { [nameError: string]: string } = {};

  habito: any = {
    nombre: '',
    descripcion: '',
    frecuencia: '',
    duracion: ''
  };


  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [''],
      descripcion: [''],
      frecuencia: [''],
      duracion: ['']
    });
  }

  onSubmit() {
    // Handle form submission
  }
}
