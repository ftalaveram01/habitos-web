import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../Services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  nombre: String = '';
  email: String = '';
  numeroHabitos: Number = 0

  constructor(private userService: UserService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserData().subscribe((data: any) => {
      this.nombre = data.nombre;
      this.email = data.email;
      this.numeroHabitos = data.numeroHabitos;
    })
  }

  btnUpdate() {
    this.localStorage.setItem('nombre', this.nombre);
    this.localStorage.setItem('email', this.email);
    this.router.navigate(['/home/update'])
  }
}
