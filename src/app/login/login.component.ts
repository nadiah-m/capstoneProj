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
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('next response', response);
        this.loggedIn = true;
      },
      error: (error) => {
        (this.errorMessage = error.error), console.log(error.error);
      },
      complete: () => this.router.navigate(['/dashboard-admin/home']),
    });
  }
}
