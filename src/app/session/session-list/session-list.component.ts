import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
  imports: [CommonModule]
})
export class SessionListComponent implements OnInit {
  persons: any[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.getPersons().subscribe((data) => {
      this.persons = data;
    });
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
