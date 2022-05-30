import { Component } from '@angular/core';
import { UserAuth } from './models/userAuth';
import { AuthenticationService } from './_Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Project Planner';
  loggedIn: boolean = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const currentUser: UserAuth = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );
    this.authService.setCurrentUser(currentUser);
  }
}
