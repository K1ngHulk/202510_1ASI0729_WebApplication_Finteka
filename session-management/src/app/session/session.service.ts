import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'http://localhost:3000/persons';

  constructor(private http: HttpClient) {}

  getPersons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
