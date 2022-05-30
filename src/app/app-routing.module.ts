import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AssignProjectComponent } from './assign-project/assign-project.component';
import { AssignUsersComponent } from './assign-users/assign-users.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { LoginComponent } from './login/login.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    children: [
      { path: 'project/:id', component: ProjectDetailsComponent },
      { path: 'home', component: AdminHomeComponent },
    ],
  },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'edit-project', component: EditProjectComponent },
  { path: 'create-client', component: CreateClientComponent },
  { path: 'edit-client', component: EditClientComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'assign-users', component: AssignUsersComponent },
  { path: 'assign-project', component: AssignProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
