import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserAuth } from '../models/userAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiURL = 'http://localhost:5293';
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<UserAuth>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(userData: any) {
    return this.http.post(this.apiURL + '/api/Users/login', userData).pipe(
      map((response: any) => {
        const user = response;
        console.log("authservice login",user)
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(this.currentUserSubject);
          return user;
        }
      })
    );
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['welcome'])
  }
}
