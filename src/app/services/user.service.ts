import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    email: string;
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://my-json-server.typicode.com/K1ngHulk/database/users';

    constructor(private http: HttpClient) {}

    register(user: User): Observable<any> {
        return this.http.post(this.apiUrl, user);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}

