import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AssignProjectComponent } from './assign-project/assign-project.component';
import { AssignUsersComponent } from './assign-users/assign-users.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { LoginComponent } from './login/login.component';
import { ManageUsersComponent } from './users-list/manage-users.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'project/:id',
        component: ProjectDetailsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'home',
        component: AdminHomeComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: 'dashboard-user/:id',
    component: DashboardUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-project',
    component: CreateProjectComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-project',
    component: EditProjectComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'create-client',
    component: CreateClientComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-client',
    component: EditClientComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'assign-users',
    component: AssignUsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'assign-project',
    component: AssignProjectComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
