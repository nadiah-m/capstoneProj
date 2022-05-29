import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClientsService } from '../Services/clients.service';
import { ProjectService } from '../Services/project.service';
import { TeamService } from '../Services/team.service';
import { UsersApiService } from '../Services/users-api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  projectId: any;
  projectDetails: any;
  projectClient: any = [];
  projectTeam: any = [];
  projectCost: any;
  costData: any = [];
  userList: any = [];
  private projectList: any = [];

  addTeamMemberForm = this.formBuilder.group({
    teamMember: [null],
  });

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public clientService: ClientsService,
    private teamService: TeamService,
    public userService: UsersApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  getProjectClient(clientId: any) {
    this.clientService.getClientId(clientId).subscribe((response) => {
      this.projectClient = response.data[0];
      console.log('this.projectClient', this.projectClient);
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
      this.router.navigate(['/dashboard-admin']);
    });
  }

  getProjectDetails(projectId: any) {
    this.projectService.getProjectId(projectId).subscribe((response) => {
      // console.log('response', response);
      this.projectDetails = response.data[0];
      console.log('project details', this.projectDetails);
    });
  }

  getProjectTeam(projectId: any) {
    this.teamService.getProjectTeam(projectId).subscribe((res) => {
      this.projectTeam = res.data;
    });
  }

  deleteTeamMember(userId: any, projectId: any) {
    console.log('delete userId', userId);
    console.log('delete projectId', projectId);
    this.teamService
      .deleteTeamFromApi(userId, projectId)
      .subscribe((data: {}) => this.getProjectTeam(projectId));
  }

  getUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res.data;
      console.log('userlist dashboard', this.userList);
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

  ngOnInit(): void {
    this.getUserList();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectId = params.get('id');
      this.getProjectDetails(this.projectId);
      this?.getProjectClient(this.projectDetails.clientId);
      this.getProjectTeam(this.projectId);
    });
  }
}
