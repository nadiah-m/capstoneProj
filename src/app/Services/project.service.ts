import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from './responseObj';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiURL = 'http://localhost:5293';
  constructor(private http: HttpClient) {}

  createProject(projectData: any) {
    return this.http.post<any>(this.apiURL + '/api/Project', projectData);
  }

  getProjectList(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.apiURL + '/api/Project');
  }
}
