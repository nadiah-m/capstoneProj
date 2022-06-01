import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgChartsModule} from 'ng2-charts'

import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ManageUsersComponent } from './users-list/manage-users.component';
import { AssignUsersComponent } from './assign-users/assign-users.component';
import { AssignProjectComponent } from './assign-project/assign-project.component';

import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NotAuthComponent } from './errors/not-auth/not-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    WelcomeComponent,
    LoginComponent,
    DashboardAdminComponent,
    NavbarComponent,
    CreateProjectComponent,
    EditProjectComponent,
    CreateClientComponent,
    EditClientComponent,
    ManageUsersComponent,
    AssignUsersComponent,
    AssignProjectComponent,
    ProjectDetailsComponent,
    AdminHomeComponent,
    DashboardUserComponent,
    NotAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
