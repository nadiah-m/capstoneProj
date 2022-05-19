import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../Services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public projectService: ProjectService, private router: Router) {}

  projectList: any = [];

  getProjectList() {
    this.projectService
      .getProjectList()
      .subscribe((res) => (this.projectList = res.data));
  }

  ngOnInit(): void {
    this.getProjectList();
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
