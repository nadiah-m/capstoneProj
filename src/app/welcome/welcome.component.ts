import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ResponseObject } from '../Services/responseObj';
import { Users } from '../Services/users';

import { UsersApiService } from '../Services/users-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  firstName!: string;
  lastName!: string;
  responseObject!: ResponseObject;
  users!: any[];
  constructor(public usersApi: UsersApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersApi.getUsers().subscribe((response) => {
      this.responseObject = response;
      this.users = this.responseObject.data;
      this.firstName = this.responseObject.data[0].firstName;
      this.lastName = this.responseObject.data[0].lastName;
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
