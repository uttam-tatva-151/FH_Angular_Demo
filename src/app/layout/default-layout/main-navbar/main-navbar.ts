import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterLink],
  templateUrl: './main-navbar.html',
  styleUrl: './main-navbar.css'
})
export class MainNavbar {
  @Output() logoutEvent = new EventEmitter<any>();

  logoutClicked(){
    this.logoutEvent.emit();
  }
}
