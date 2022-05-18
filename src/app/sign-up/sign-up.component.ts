import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersApiService } from '../Services/users-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public usersApi: UsersApiService
  ) {}

  signUpForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  clickSubmit() {
    alert('Account created successfully');
    console.log(this.signUpForm);
    this.usersApi
      .createUsers({
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      })
      .subscribe((data: {}) => {
        this.router.navigate(['/login']);
      });

    // this.router.navigate(['/login'], {
    //   state: {
    //     firstName: this.firstName,
    //     lastName: this.lastName,
    //     email: this.email,
    //     password: this.password,
    //   },
    // });
    // console.log(this.firstName, this.lastName, this.email, this.password);
  }
}
