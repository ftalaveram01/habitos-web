import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserData().subscribe((data: any) => {
      this.nombre = data.nombre;
      this.email = data.email;
      this.numeroHabitos = data.numeroHabitos;
    })
  }
}
