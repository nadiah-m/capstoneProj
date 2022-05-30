import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TeamService } from '../_Services/team.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
})
export class DashboardUserComponent implements OnInit {
  assignedProjects: any = [];
  userId: any;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getProjects(userId: any) {
    this.teamService.getAssignedProjects(userId).subscribe((res) => {
      this.assignedProjects = res.data;
      console.log(this.assignedProjects);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
      this.getProjects(this.userId);
    });
  }
}
