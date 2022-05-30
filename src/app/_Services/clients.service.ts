import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from '../models/responseObj';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiURL = 'http://localhost:5293';

  constructor(private http: HttpClient) {}

  //get client names
  getClients(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.apiURL + '/api/Client');
  }

  getClientId(id: any): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.apiURL + '/api/Client/' + id);
  }

  createNewClient(clientData: any) {
    return this.http.post(this.apiURL + '/api/Client', clientData);
  }

  editClient(clientData: any) {
    return this.http.put(this.apiURL + '/api/Client', clientData);
  }
}
