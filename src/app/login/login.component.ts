import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;

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
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        console.log('next response', user);
        this.loggedIn = true;
      },
      error: (error) => console.log(error.error),
      complete: () => this.router.navigate(['/dashboard-admin']),
    });
  }
}
