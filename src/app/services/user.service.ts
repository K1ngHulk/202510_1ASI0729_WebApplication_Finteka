import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from "@angular/router";

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
    private currentUser = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient, private router: Router) {}

    login(username: string, password: string) {
        this.http.get<any[]>(this.apiUrl).subscribe(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                this.currentUser.next(user);
                this.router.navigate(['/profile']);
            } else {
                alert('Invalid username or password');
            }
        });
    }

    getCurrentUser() {
        return this.currentUser.asObservable();
    }

    updateUser(user: any) {
        return this.http.put(`${this.apiUrl}/${user.id}`, user);
    }

    register(user: User): Observable<any> {
        return this.http.post(this.apiUrl, user);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}

