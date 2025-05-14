import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIf } from "@angular/common";
import { Toolbar } from './public/toolbar';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar *ngIf="showToolbar"></app-toolbar>
    <div class="content">
    <router-outlet></router-outlet>
    </div>
  `,
  imports: [
    RouterOutlet,
    NgIf,
    Toolbar // Add Toolbar here
  ],
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