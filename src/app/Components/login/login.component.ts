import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.authService.Login(this.email, this.password, (ok: boolean, user?: any) => {
      if (ok) {
        this.router.navigate(['/home']);
      } else {
        alert('Invalid username or password');
      }
    })
  }
}
