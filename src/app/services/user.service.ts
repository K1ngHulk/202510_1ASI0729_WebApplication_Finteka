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
    private apiUrl = 'https://my-json-server.typicode.com/RussellUPC/fakebackendFinteka/users';
    private currentUser = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    constructor(private http: HttpClient, private router: Router) {
        const stored = localStorage.getItem('currentUser');
        const initial = stored ? JSON.parse(stored) as User : null;
        this.currentUser= new BehaviorSubject<User | null>(initial);
    }

    login(username: string, password: string) {
        this.http.get<any[]>(this.apiUrl).subscribe(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                this.currentUser.next(user);
                try {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log('Usuario guardado en localStorage:', localStorage.getItem('currentUser'));
                } catch (e) {
                    console.error('Error guardando en localStorage', e);
                }
                this.router.navigate(['/profile']).then(() => {
                    window.location.reload();
                });
            } else {
                alert('Invalid username or password');
            }
        });
    }

    logout() {
        this.currentUser.next(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('loggedUser');

        this.router.navigate(['/login']).then(() => {
            window.location.reload();
        });
    }


    getCurrentUser(): Observable<User | null> {
        return this.currentUser.asObservable();
    }

    updateUser(user: any) {
        return this.http.put(`${this.apiUrl}/${user.id}`, user);
    }

    register(user: User): Observable<any> {
        return this.http.post(this.apiUrl, user);
    }
}