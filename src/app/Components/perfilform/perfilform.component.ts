import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../Services/localstorage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  submitted = false;

  constructor(private localStorage: LocalStorageService, private router: Router, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = String(this.localStorage.getItem('nombre')).replaceAll('"', '');
    this.mail = this.localStorage.getItem('email');

    this.form = this.fb.group({
      nombre: [this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      email: [this.mail, Validators.required, this.emailValidator]
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      newpassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      confirmnewpassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
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

  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('newpassword')?.value;
    const confirmPassword = formGroup.get('confirmnewpassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmnewpassword')?.setErrors({ noMatch: true });
    } else {
    }
  }

  updateUser() {
    this.userService.updateUserData(this.form.value).subscribe(
      (response) => {
        this.toastr.info('User data updated successfully!', 'User Update', { timeOut: 1100 })
        this.router.navigate(['/home']);
      }
      , (error) => {
        this.toastr.error('Error updating user data', 'User Update', { timeOut: 1100 })
        this.errors = error.error.errors;
      }
    );
  }

  updatePasswordTemporal() {
    this.abrirModal = true;
  }

  cerrarModal() {
    this.abrirModal = false;
    this.passwordForm.reset();
  }

  updatePassword() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }

    this.userService.updatePassword(this.passwordForm.value).subscribe(
      (response) => {
        if (response.success) {
          this.toastr.info('Password updated successfully!', 'Password Update', { timeOut: 1100 })
          this.cerrarModal();
          this.passwordForm.reset();
        } else {
          this.toastr.error('Error updating password!!', 'Password Update', { timeOut: 1000 })
          this.passwordForm.reset();
        }
      }
      , (error) => {
        this.errors = error.error.errors;
        this.toastr.error('Error updating password!!', 'Password Update', { timeOut: 1000 })
        this.passwordForm.reset();
      })
  }

  get email() {
    return this.form.get('email');
  }

  get confirmnewpassword() {
    return this.passwordForm.get('confirmnewpassword');
  }

}
