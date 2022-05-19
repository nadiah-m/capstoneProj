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
  ) {}

  projectList: any = [];
  clientList: any = [];
  userList: any = [];
  projectTeam: any = [];

  getProjectList() {
    this.projectService
      .getProjectList()
      .subscribe((res) => (this.projectList = res.data));
  }

  getClientList() {
    this.clientService.getClients().subscribe((res) => {
      this.clientList = res.data;
      console.log(this.clientList);
    });
  }

  getUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res.data;
      console.log(this.userList);
    });
  }

  getProjectTeam(projectId: any) {
    this.projectService.getProjectTeam(projectId).subscribe((res) => {
      console.log(res.data);
      this.projectTeam = res.data;
    });
  }

  ngOnInit(): void {
    this.getProjectList();
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

  clickDelete(projectId: any) {
    this.projectService
      .deleteProject(projectId)
      .subscribe((data: {}) => this.getProjectList());
  }
}
