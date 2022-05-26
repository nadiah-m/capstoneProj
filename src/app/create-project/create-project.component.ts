import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClientsService } from '../Services/clients.service';
import { ProjectService } from '../Services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  errorMessage: string = '';

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
    availFunds: [null],
    status: [null],
    clientId: [],
  });
  ngOnInit() {
    this.getClientNames();
  }

  clientId: any = [];

  getClientNames() {
    this.clientService
      .getClients()
      ?.subscribe((res) => (this.clientId = res.data));
  }

  clickSubmit() {
    console.log(this.newProjectForm.value);
    this.projectService.createProject(this.newProjectForm.value).subscribe({
   
      error: (error) => {
        (this.errorMessage = error.error), console.log(error.error);
      },
      complete: () => this.router.navigate(['/dashboard-admin']),
    });
  }
}
