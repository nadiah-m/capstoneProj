import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ResponseObject } from '../models/responseObj';
import { Users } from '../_Services/users';

import { UsersApiService } from '../_Services/users-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
