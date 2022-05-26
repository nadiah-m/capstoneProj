import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserAuth } from '../models/userAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiURL = 'http://localhost:5293';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<UserAuth>;

  constructor(private http: HttpClient) {
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
  }
}
