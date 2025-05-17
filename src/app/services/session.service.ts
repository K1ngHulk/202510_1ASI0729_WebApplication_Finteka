import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = 'https://my-json-server.typicode.com/RussellUPC/fakebackendFinteka/profesionals';

  constructor(private http: HttpClient) {}

  getPersons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProfessionalsByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?nombre=${name}`);
  }
}
