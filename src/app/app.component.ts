import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Habitos';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.authService.checkAuth().subscribe((isAuthenticated) => {


      if (isAuthenticated && (this.isLoginPage() || this.isRegisterPage() || this.isInitialPage())) {
        this.toastr.success('Credentials validated', 'Welcome!', { timeOut: 800 })
        this.router.navigate(['/home']);
      }

      if (!isAuthenticated && (!this.isLoginPage() && !this.isRegisterPage() && !this.isInitialPage())) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

  private isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  private isRegisterPage(): boolean {
    return this.router.url === '/register';
  }

  private isInitialPage(): boolean {
    return this.router.url === '/';
  }

  private isHomePage(): boolean {
    return this.router.url === '/home';
  }

}
