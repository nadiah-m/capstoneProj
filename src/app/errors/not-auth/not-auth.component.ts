import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_Services/authentication.service';

@Component({
  selector: 'app-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.css'],
})
export class NotAuthComponent implements OnInit {
  userId: any;
  loggedIn: boolean = false;

  constructor(
    
  ) {}

  ngOnInit(): void {}
}
