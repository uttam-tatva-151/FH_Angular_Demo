import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainNavbar } from './main-navbar/main-navbar';

@Component({
  selector: 'app-screen-builder-layout',
  imports: [RouterOutlet, MainNavbar],
  templateUrl: './screen-builder-layout.html',
  styleUrl: './screen-builder-layout.css'
})
export class ScreenBuilderLayout {

}
