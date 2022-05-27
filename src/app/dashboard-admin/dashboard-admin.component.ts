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

  getProjectDetails(projectId: any) {
    let obj = this.projectList.filter((proj: any) => proj.id == projectId);
    this.projectDetails = obj;
    this.getProjectTeam(projectId);
    console.log('getprojectdetails', this.projectDetails);
    let getClientId = this.projectDetails[0].clientId;
    this.getProjectClient(getClientId);
  }

  goToProjectPage(projectId: any) {
    console.log('go to project page', projectId);
    this.router.navigate(['project', projectId], { relativeTo: this.route });
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
      // console.log('this clientList', this.clientList);
    });
  }

  getUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res.data;
      console.log('userlist dashboard', this.userList);
    });
  }

  getProjectClient(clientId: any) {
    let clientObj = this.clientList.filter(
      (client: any) => client.id == clientId
    );
    // console.log('getProjectClient method', clientObj);
    this.clientProject = clientObj[0];
    return this.clientProject;
  }

  getProjectTeam(projectId: any) {
    this.teamService.getProjectTeam(projectId).subscribe((res) => {
      // console.log(res.data);
      this.projectTeam = res.data;
    });
  }

  addTeam(projectId: any) {
    let userIdToAdd = Number(this.addTeamMemberForm.value.teamMember);
    // console.log('userIdToAdd', userIdToAdd);
    // console.log('this project', projectId);
    this.teamService
      .addTeamMember(userIdToAdd, projectId)
      .subscribe((data: {}) => {
        this.getProjectTeam(projectId);
      });
  }

  deleteTeamMember(userId: any, projectId: any) {
    console.log('delete userId', userId);
    console.log('delete projectId', projectId);
    this.teamService
      .deleteTeamFromApi(userId, projectId)
      .subscribe((data: {}) => this.getProjectTeam(projectId));
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
