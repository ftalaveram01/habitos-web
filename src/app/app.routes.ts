import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { HomeComponent } from './Components/home/home.component';
import { HabitoformComponent } from './Components/habitoform/habitoform.component';
import { PerfilformComponent } from './Components/perfilform/perfilform.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home/new', component: HabitoformComponent },
    { path: 'home/update', component: PerfilformComponent }
];
