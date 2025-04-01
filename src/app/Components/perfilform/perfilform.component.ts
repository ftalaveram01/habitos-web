import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../Services/localstorage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfilform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfilform.component.html',
  styleUrl: './perfilform.component.css'
})
export class PerfilformComponent implements OnInit, OnDestroy {

  form !: FormGroup;
  errors: { [nameError: string]: string } = {};
  name: String = '';
  mail: String = '';

  constructor(private localStorage: LocalStorageService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.name = String(this.localStorage.getItem('nombre')).replaceAll('"', '');
    this.mail = this.localStorage.getItem('email');

    this.form = this.fb.group({
      nombre: [this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      email: [this.mail, Validators.required, this.emailValidator]
    });
  }

  ngOnDestroy(): void {
    this.localStorage.removeItem('nombre');
    this.localStorage.removeItem('email');
  }

  async emailValidator(control: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  updateUser() {

  }

  get email() {
    return this.form.get('email');
  }

}
