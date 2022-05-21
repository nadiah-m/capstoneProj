import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../Services/clients.service';
import { ProjectService } from '../Services/project.service';
import { UsersApiService } from '../Services/users-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public projectService: ProjectService,
    private router: Router,
    public clientService: ClientsService,
    public userService: UsersApiService
  ) {
    this.getProjectList();
  }

  projectList: any = [];
  clientList: any = [];
  userList: any = [];
  projectTeam: any = [];
  projectDetails: any = [];

  getProjectDetails(projectId: any) {
    console.log(projectId);
    let obj = this.projectList.filter((proj: any) => proj.id == projectId);
    this.projectDetails = obj;
    this.getProjectTeam(projectId);
    console.log('getprojectdetails', this.projectDetails);
  }

  getProjectList() {
    this.projectService.getProjectList().subscribe((res) => {
      this.projectList = res.data;
      console.log('projectList', this.projectList);
      return this.projectList;
    });
  }

  getClientList() {
    this.clientService.getClients().subscribe((res) => {
      this.clientList = res.data;
    });
  }

  getUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res.data;
    });
  }

  getProjectTeam(projectId: any) {
    this.projectService.getProjectTeam(projectId).subscribe((res) => {
      console.log(res.data);
      this.projectTeam = res.data;
    });
  }

  addTeam(projectId:any) {
    console.log("addTeam",projectId)
  }

  ngOnInit(): void {
    this.getClientList();
    this.getUserList();
  }

  clickEdit(projectId: any) {
    this.router.navigate(['/edit-project'], {
      state: {
        projectId,
      },
    });
  }

  clickTeam(projectId: any) {
    this.getProjectTeam(projectId);
  }

  clickDelete(projectId: any) {
    this.projectService
      .deleteProject(projectId)
      .subscribe((data: {}) => this.getProjectList());
  }
}
