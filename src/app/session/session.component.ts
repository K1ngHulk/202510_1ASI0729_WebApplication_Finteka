import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Disponibilidad {
  [hora: string]: boolean;
}

interface Persona {
  id: number;
  nombre: string;
  profesion: string;
  disponibilidad: Disponibilidad;
}

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  personas: Persona[] = [];
  apiUrl = 'http://localhost:3000/persons';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPersonas();
  }

  obtenerPersonas(): void {
    this.http.get<Persona[]>(this.apiUrl).subscribe(data => {
      this.personas = data;
    });
  }

  toggleDisponibilidad(persona: Persona, hora: string): void {
    persona.disponibilidad[hora] = !persona.disponibilidad[hora];

    this.http.put(`${this.apiUrl}/${persona.id}`, persona).subscribe();
  }

  // Método para obtener las horas de disponibilidad
  getHoras(disponibilidad: Disponibilidad): string[] {
    return Object.keys(disponibilidad);
  }
}
