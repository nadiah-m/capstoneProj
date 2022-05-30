import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from '../models/responseObj';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  apiURL = 'http://localhost:5293';
  constructor(private http: HttpClient) {}

  //get team members
  getProjectTeam(id: any): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(
      this.apiURL + '/api/Team/teamMembers?id=' + id
    );
  }

  //link user to project
  addTeamMember(userId: any, projectId: any) {
    return this.http.post(
      this.apiURL +
        '/api/Team/UserProjects?userId=' +
        userId +
        '&projectId=' +
        projectId,
      userId,
      projectId
    );
  }

  //delete user to project
  deleteTeamFromApi(userId: any, projectId: any) {
    return this.http.delete(
      this.apiURL +
        '/api/Team/UserProjects?userId=' +
        userId +
        '&projectId=' +
        projectId
    );
  }

  //get projects assigned to user
  getAssignedProjects(userId: any): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(
      this.apiURL + '/api/Team/UserProjects?id=' + userId
    );
  }
}
