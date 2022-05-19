import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersApiService } from '../Services/users-api.service';
import { AssignUsers } from './assign-users';

@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.css'],
})
export class AssignUsersComponent implements OnInit {
  userId: any;
  userIdDetails: any;
  assignUsers: AssignUsers = new AssignUsers();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersApiService,
    private router: Router
  ) {
    console.log(this?.router?.getCurrentNavigation()?.extras?.state);
    this.userId = this?.router?.getCurrentNavigation()?.extras?.state;
    console.log('assign-users', this.userId);
  }

  updateUserAssign = this.formBuilder.group({
    role: [null],
    designation: [null],
  });

  getUserIdData() {
    this.userService.getUserId(this.userId).subscribe((res) => {
      this.userIdDetails = res.data[0];
      console.log(this.userIdDetails);
    });
  }

  ngOnInit(): void {
    this.getUserIdData();
  }

  clickSubmit() {
    this.assignUsers.id = this.userId;
    this.assignUsers.role =
      this.updateUserAssign.value.role != null
        ? this.updateUserAssign.value.role
        : this.userIdDetails.role;

    this.assignUsers.designation =
      this.updateUserAssign.value.designation != null
        ? this.updateUserAssign.value.designation
        : this.userIdDetails.role;

    console.log(this.assignUsers);

    this.userService
      .updateUserRole(this.assignUsers)
      .subscribe((data: {}) => this.router.navigate(['/manage-users']));
  }
}
