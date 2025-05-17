import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../services/user.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import { Router, RouterModule} from "@angular/router";
@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      console.log(user);
      this.user = user;
    });
  }

  saveChanges() {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(() => {
        alert('Profile updated successfully');
      });
    }
  }

  logout() {
    this.userService.logout();
  }
}