import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ResponseObject } from './responseObj';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  apiURL = 'http://localhost:5293';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ResponseObject> {
    return this.http
      .get<ResponseObject>(this.apiURL + '/api/Users')
      .pipe(retry(1), catchError(this.handleError));
  }

  createUsers(userData : any) {
    return this.http
      .post<any>(this.apiURL + '/api/Users/signup', userData)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
