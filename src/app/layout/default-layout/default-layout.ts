import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { navItems } from './_nav';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MainNavbar } from './main-navbar/main-navbar';
import { SecondNavbar } from './second-navbar/second-navbar';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgScrollbarModule,
    MainNavbar,
    SecondNavbar
  ],
  templateUrl: './default-layout.html',
  styleUrl: './default-layout.css',
})
export class DefaultLayout {

  constructor(private router: Router){

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
