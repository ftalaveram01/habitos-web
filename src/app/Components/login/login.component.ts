import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { LocalStorageService } from '../../Services/localstorage.service';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private localStorage: LocalStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.authService.Login(this.email, this.password, (ok: boolean, user?: any) => {
      if (ok) {
        console.log(user.password);
        this.localStorage.setItem('user', user);
        this.router.navigate(['/home']);
      } else {
        alert('Invalid username or password');
      }
    })
  }
}
