import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }
clickSubmit(){
  console.log("check if user exists", this.email, this.password)
}
}
