import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ClientsService } from '../_Services/clients.service';
import { ProjectService } from '../_Services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  errorMessage: string = '';
  clientId: any = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientsService,
    public projectService: ProjectService
  ) {}

  newProjectForm = this.formBuilder.group({
    projectName: [null],
    startDate: [null],
    projectDesc: [null],
    projectCost: [null],
    currentExp: [null],
    status: [null],
    clientId: [],
  });

  ngOnInit() {
    this.getClientNames();
  }

  getClientNames() {
    this.clientService
      .getClients()
      ?.subscribe((res) => (this.clientId = res.data));
  }

  clickSubmit() {
    console.log(this.newProjectForm.value);
    this.projectService
      .createProject({
        projectName: this.newProjectForm.value.projectName,
        startDate: this.newProjectForm.value.startDate,
        projectDesc: this.newProjectForm.value.projectDesc,
        projectCost: this.newProjectForm.value.projectCost,
        currentExp: this.newProjectForm.value.currentExp,
        availFunds:
          this.newProjectForm.value.projectCost -
          this.newProjectForm.value.currentExp,
        status: this.newProjectForm.value.status,
        clientId: this.newProjectForm.value.clientId,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard-admin']);
        },
        error: (error) => {
          this.errorMessage = error.error;
          console.log(error.error);
          return;
        },
      });
  }
}
