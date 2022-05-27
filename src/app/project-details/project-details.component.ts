import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClientsService } from '../Services/clients.service';
import { ProjectService } from '../Services/project.service';
import { TeamService } from '../Services/team.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public clientService: ClientsService,
    private teamService: TeamService
  ) {}

  getProjectClient(clientId: any) {
    this.clientService.getClientId(clientId).subscribe((response) => {
      this.projectClient = response.data[0];
      console.log('this.projectClient', this.projectClient);
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


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectId = params.get('id');
      this.getProjectDetails(this.projectId);
      this?.getProjectClient(this.projectDetails.clientId);
      this.getProjectTeam(this.projectId);


   
    });
  }
}
