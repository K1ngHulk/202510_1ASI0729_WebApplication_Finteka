import { Component, OnInit } from '@angular/core';
import { SessionService, Person } from './session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  persons: Person[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.loading = true;
    this.sessionService.getPersons().subscribe({
      next: (data) => {
        this.persons = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error cargando personas.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  toggleDisponibilidad(person: Person, timeSlot: string): void {
    const currentState = person.disponibilidad[timeSlot];
    // Toggle the current availability value
    person.disponibilidad[timeSlot] = !currentState;

    // Call patch to update disponibilidad in backend
    this.sessionService.updateDisponibilidad(person.id, person.disponibilidad).subscribe({
      next: (updatedPerson) => {
        // Optionally update local data with returned response
        person.disponibilidad = updatedPerson.disponibilidad;
      },
      error: (error) => {
        // revert the change on error
        person.disponibilidad[timeSlot] = currentState;
        alert('Error actualizando disponibilidad. Intente de nuevo.');
        console.error(error);
      }
    });
  }

  getTimeSlots(person: Person): string[] {
    return Object.keys(person.disponibilidad);
  }

}
