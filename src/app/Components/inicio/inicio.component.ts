import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  isMobile: boolean = false;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isMobile = result.matches;
    }
    );
  }

  ngOnInit() { }

  irALogin() {
    this.router.navigate(['/login']);
  }

  irARegister() {
    this.router.navigate(['/register']);
  }

}
