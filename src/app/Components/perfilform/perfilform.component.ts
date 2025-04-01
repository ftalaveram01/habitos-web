import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../Services/localstorage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-perfilform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfilform.component.html',
  styleUrl: './perfilform.component.css'
})
export class PerfilformComponent implements OnInit, OnDestroy {

  form !: FormGroup;
  passwordForm !: FormGroup;
  errors: { [nameError: string]: string } = {};
  name: String = '';
  mail: String = '';
  abrirModal = false;

  constructor(private localStorage: LocalStorageService, private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.name = String(this.localStorage.getItem('nombre')).replaceAll('"', '');
    this.mail = this.localStorage.getItem('email');

    this.form = this.fb.group({
      nombre: [this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      email: [this.mail, Validators.required, this.emailValidator]
    });

    this.passwordForm = this.fb.group({
      password: [''],
      newpassword: [''],
      confirmnewpassword: ['']
    })
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
    this.userService.updateUserData(this.form.value).subscribe(
      (response) => {
        alert('User data updated successfully!');
        this.router.navigate(['/home']);
      }
      , (error) => {
        console.error('Error updating user data:', error);
        this.errors = error.error.errors;
      }
    );
  }

  updatePasswordTemporal() {
    this.abrirModal = true;
  }

  cerrarModal() {
    this.abrirModal = false;
  }

  updatePassword() {
    this.userService.updatePassword(this.passwordForm.value).subscribe(
      (response) => {
        alert('Password updated successfully!');
        this.cerrarModal()
      }
      , (error) => {
        this.errors = error.error.errors;
      })
    this.abrirModal = false;
  }

  get email() {
    return this.form.get('email');
  }

}
