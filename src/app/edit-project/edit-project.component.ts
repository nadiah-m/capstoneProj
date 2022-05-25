import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from '../Services/clients.service';
import { ProjectService } from '../Services/project.service';
import { Project } from './project';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  projectId: any;
  projectIdData: any;
  orgStartDate: any;
  editForm: Project = new Project();
  clientId: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public projectService: ProjectService,
    private clientService: ClientsService
  ) {
    // console.log(this?.router?.getCurrentNavigation()?.extras?.state);
    this.projectId =
      this?.router?.getCurrentNavigation()?.extras?.state?.['projectId'];
    console.log('edit-project', this.projectId);
  }

  editProjectForm = this.formBuilder.group({
    projectName: [null],
    startDate: [null],
    projectDesc: [null],
    projectCost: [null],
    currentExp: [null],
    availFunds: [null],
    status: [null],
    clientId: [],
  });

  getProjectIdDetails() {
    this?.projectService?.getProjectId(this.projectId)?.subscribe((res) => {
      this.projectIdData = res.data[0];
      this.orgStartDate = this.projectIdData.startDate
        .slice(0, 10)
        .split('/')
        .reverse()
        .join('-');
    });
  }

  getClientNames() {
    this.clientService
      .getClients()
      ?.subscribe((res) => (this.clientId = res.data));
  }

  ngOnInit() {
    this.getProjectIdDetails();
    this.getClientNames();
  }

  clickSubmit() {
    // console.log(this.editProjectForm.value);
    this.editForm.id = this.projectId;

    this.editForm.projectName =
      this.editProjectForm.value.projectName != null
        ? this.editProjectForm.value.projectName
        : this.projectIdData.projectName;

    this.editForm.startDate =
      this.editProjectForm.value.startDate != null
        ? this.editProjectForm.value.startDate
        : this.projectIdData.startDate;

    this.editForm.projectDesc =
      this.editProjectForm.value.projectDesc != null
        ? this.editProjectForm.value.projectDesc
        : this.projectIdData.projectDesc;

    this.editForm.projectCost =
      this.editProjectForm.value.projectCost != null
        ? this.editProjectForm.value.projectCost
        : this.projectIdData.projectCost;

    this.editForm.currentExp =
      this.editProjectForm.value.currentExp != null
        ? this.editProjectForm.value.currentExp
        : this.projectIdData.currentExp;

    this.editForm.availFunds =
      this.editProjectForm.value.availFunds != null
        ? this.editProjectForm.value.availFunds
        : this.projectIdData.availFunds;

    this.editForm.status =
      this.editProjectForm.value.status != null
        ? this.editProjectForm.value.status
        : this.projectIdData.status;

    this.editForm.clientId =
      this.editProjectForm.value.clientId != null
        ? this.editProjectForm.value.clientId
        : this.projectIdData.clientId;

    console.log('editForm', this.editForm);

    this.projectService.editProject(this.editForm).subscribe((data: {}) => {
      this.router.navigate(['/dashboard-admin']);
    });
  }
}
