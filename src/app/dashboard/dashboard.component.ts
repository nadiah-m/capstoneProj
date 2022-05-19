import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public projectService: ProjectService) {}

  projectList: any = [];

  getProjectList() {
    this.projectService
      .getProjectList()
      .subscribe((res) => this.projectList = res.data);
  }

  ngOnInit(): void {
    this.getProjectList();
  }
}
