import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../Services/clients.service';
import { ProjectService } from '../Services/project.service';
import { TeamService } from '../Services/team.service';
import { UsersApiService } from '../Services/users-api.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent implements OnInit {
  constructor(
    public projectService: ProjectService,
    private router: Router,
    public clientService: ClientsService,
    public teamService: TeamService,
    public userService: UsersApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  projectList: any = [];
  clientList: any = [];
  userList: any = [];
  projectTeam: any = [];
  projectDetails: any = [];
  clientProject: any = [];
  projectIdClicked: any;

  addTeamMemberForm = this.formBuilder.group({
    teamMember: [null],
  });

  
  goToProjectPage(projectId: any) {
    this.router.navigate(['project', projectId], { relativeTo: this.route });
  }

  goToHomeDashboard() {
    this.router.navigate(['home'], { relativeTo: this.route });
  }

  public getProjectList() {
    this.projectService.getProjectList().subscribe((res) => {
      this.projectList = res.data;
      console.log('projectList', this.projectList);
      return this.projectList;
    });
  }

  getClientList() {
    this.clientService.getClients().subscribe((res) => {
      this.clientList = res.data;
      // console.log('this clientList', this.clientList);
    });
  }

  getUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res.data;
      console.log('userlist dashboard', this.userList);
    });
  }



  clickEdit(projectId: any) {
    this.router.navigate(['/edit-project'], {
      state: {
        projectId,
      },
    });
  }

 

  clickDelete(projectId: any) {
    this.projectService.deleteProject(projectId).subscribe((data: {}) => {
      this.getProjectList();
    });
  }

  ngOnInit(): void {
    this.getClientList();
    this.getUserList();
    this.getProjectList();
  }
}
