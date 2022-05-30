import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  userFirstName: string = '';
  userRole: string = '';
  userId: number = 0;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
  }

  goToDashboard() {
    if (this.userRole == '' || this.userRole == 'User') {
      this.router.navigate(['/dashboard-user', this.userId]);
    } else if (this.userRole == 'Admin') {
      this.router.navigate(['/dashboard-admin/home']);
    }
  }

  getCurrentUser() {
    this.authService.currentUser.subscribe({
      next: (user) => {
        this.userFirstName = user.firstName;
        this.userRole = user.role;
        this.userId = user.id;
        // console.log(this.userId);

        if (user.email) {
          this.loggedIn = true;
        }
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }
}
