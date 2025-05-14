import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
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
}