import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, first, map, Observable } from 'rxjs';
import { UsersApiService } from '../_Services/users-api.service';

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
  ) {
    this.userExistsValidator();
  }

  signUpForm = this.formBuilder.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.userExistsValidator()],
          updateOn: 'blur',
        },
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.compareValues('confirmPassword', 'password'),
    }
  );

  compareValues(
    controlToValidate: string,
    controlToCompare: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (!(formGroup.get(controlToValidate) as FormControl).value) return null;

      if (
        (formGroup.get(controlToValidate) as FormControl).value ==
        (formGroup.get(controlToCompare) as FormControl).value
      ) {
        return null;
      } else {
        (formGroup.get(controlToValidate) as FormControl).setErrors({
          compareValues: { valid: false },
        });
        return { compareValues: { valid: false } };
      }
    };
  }

  userExistsValidator(): AsyncValidatorFn | null {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usersApi.findUserByEmail(control.value).pipe(
        map((user) => (user.data[0].email ? { userExists: true } : null)),
        catchError(async (err) => null)
      );
    };
  }

  ngOnInit(): void {

  }

  clickSubmit() {

    this.usersApi
      .createUsers({
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      })
      .subscribe((data: {}) => {
        this.router.navigate(['/login']);
        alert('Account created successfully');
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
