import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  clickSubmit() {
    alert('Account created successfully');
    this.router.navigate(['/login'], {
      state: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      },
    });
    console.log(this.firstName, this.lastName, this.email, this.password);
  }
}
