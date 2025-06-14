import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {UserService} from "../services/user.service";
import { Router } from '@angular/router';
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatLabel,
    MatFormField,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private userService: UserService) {}

  login() {
    if (this.username && this.password) {
      this.userService.login(this.username, this.password);
    } else {
      alert('Please enter valid credentials');
    }
  }
}