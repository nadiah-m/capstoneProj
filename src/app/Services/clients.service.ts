import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from './responseObj';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  apiURL = 'http://localhost:5293';

  constructor(private http: HttpClient) { }

  //get client names
  getClients() : Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.apiURL + '/api/Client');
  }
}
