import { Component } from '@angular/core';
import { SessionListComponent } from './session/session-list/session-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [SessionListComponent, CommonModule]
})
export class AppComponent {}
