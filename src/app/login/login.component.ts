import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthenticationService } from '../_Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public authService: AuthenticationService
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {}
  clickSubmit() {
    this.authService
      .login(this.loginForm.value)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.loggedIn = true;

          if (user.role == 'User' || user.role == '') {
            this.router.navigate(['/dashboard-user', user.id]);
          } else if (user.role == 'Admin') {
            this.router.navigate(['/dashboard-admin/home']);
          }
        },
        error: (error) => {
          (this.errorMessage = error.error), console.log(error.error);
        },
      });
  }
}
