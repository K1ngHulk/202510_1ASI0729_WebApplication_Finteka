import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id: number;
  nombre: string;
  profesion: string;
  disponibilidad: { [key: string]: boolean };
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/persons';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  updateDisponibilidad(id: number, disponibilidad: {[key: string]: boolean}): Observable<Person> {
    return this.http.patch<Person>(`${this.apiUrl}/${id}`, { disponibilidad });
  }
}
