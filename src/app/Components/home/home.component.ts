import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MishabitosComponent } from '../mishabitos/mishabitos.component';
import { RecomendadosComponent } from '../recomendados/recomendados.component';
import { LogrosComponent } from '../logros/logros.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { AuthService } from '../../Services/auth.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MishabitosComponent, RecomendadosComponent, LogrosComponent, PerfilComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeSection: string = 'mishabitos';
  toggleMenu = false;

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  showSection(section: string) {
    this.activeSection = section;
    this.toggleMenu = false
  }

  btnLogout() {
    this.authService.Logout();
  }

  toggleMenuLateral() {
    this.toggleMenu = !this.toggleMenu;
  }

  cerrarMenuLateral() {
    this.toggleMenu = false
  }
}