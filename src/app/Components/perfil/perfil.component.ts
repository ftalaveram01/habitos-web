import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  habitos: any = []

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.userService.getUserData().subscribe((habitos: any) => {
      this.habitos = habitos;
    }))
  }
}
