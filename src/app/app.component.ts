import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {Toolbar} from "./public/toolbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showToolbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showToolbar = !(currentRoute === '/login' || currentRoute === '/register');
    });
  }
}