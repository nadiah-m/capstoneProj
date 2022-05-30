import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from '../models/responseObj';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiURL = 'http://localhost:5293';
  constructor(private http: HttpClient) {}

  createProject(projectData: any) {
    return this.http.post<any>(this.apiURL + '/api/Project', projectData);
  }

  editProject(projectData: any) {
    return this.http.put<any>(this.apiURL + '/api/Project', projectData);
  }

  getProjectList(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.apiURL + '/api/Project');
  }

  //get project id
  getProjectId(id: any): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.apiURL + '/api/Project/' + id);
  }

  // getProjectTeam(id: any): Observable<ResponseObject> {
  //   return this.http.get<ResponseObject>(
  //     this.apiURL + '/api/Project/team?id=' + id
  //   );
  // }

  //link user to project
  // addTeamMember(userId: any, projectId: any) {
  //   return this.http.post(
  //     this.apiURL +
  //       '/api/Project/UserProjects?userId=' +
  //       userId +
  //       '&projectId=' +
  //       projectId,
  //     userId,
  //     projectId
  //   );
  // }

  //delete user to project
  // deleteTeamFromApi(userId: any, projectId: any) {
  //   return this.http.delete(this.apiURL + '/api/Project/UserProjects?userId='+userId+'&projectId='+projectId);
  // }

  deleteProject(id: any) {
    return this.http.delete(this.apiURL + '/api/Project/' + id);
  }
}
