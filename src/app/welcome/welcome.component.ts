import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
// import { Users } from '../Services/users';
import { UsersApiService } from '../Services/users-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  // Users!: ResponseObject;
  firstName!:string;
  UserObject!: Users;
  responseObject! : ResponseObject;
  constructor(public usersApi: UsersApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersApi.getUsers().subscribe((response) => {
      this.responseObject = response;
      console.log(this.responseObject.data[0].firstName);
      this.firstName = this.responseObject.data[0].firstName;
      console.log(JSON.stringify(this.UserObject));
    });
    // return this.usersApi
    //   .getUsers()
    //   .pipe(
    //     (tap((response) =>
    //       console.log('Response ==>' + JSON.stringify(response))
    //     ),
    //     map((response) => (this.Users = response)))
    //   );
  }

  // this.UserObject = this.usersApi.getUsers().subscribe((response) => {
  //   this.countries = response;
  // }

  // })
}


export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface ResponseObject {
  message: string;
  status: boolean;
  data: Users[];
}
