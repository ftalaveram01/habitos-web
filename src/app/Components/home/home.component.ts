import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MishabitosComponent } from '../mishabitos/mishabitos.component';
import { RecomendadosComponent } from '../recomendados/recomendados.component';
import { LogrosComponent } from '../logros/logros.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MishabitosComponent, RecomendadosComponent, LogrosComponent, PerfilComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activeSection: string = 'mishabitos'; // Sección activa por defecto

  constructor(private authService: AuthService) { }

  showSection(section: string) {
    this.activeSection = section;
  }

  btnLogout() {
    this.authService.Logout();
  }
}