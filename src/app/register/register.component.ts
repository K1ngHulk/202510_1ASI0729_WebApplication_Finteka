import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    email: '',
    username: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  register() {
    if (this.user.email && this.user.username && this.user.password) {
      this.userService.register(this.user).subscribe({
        next: () => {
          alert('User successfully registered (simulated).');
          this.user = { email: '', username: '', password: '' };
        },
        error: (err) => {
          console.error('Error registering.', err);
        }
      });
    } else {
      alert('All fields are required.');
    }
  }
}
