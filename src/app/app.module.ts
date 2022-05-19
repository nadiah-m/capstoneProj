import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';


import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AssignUsersComponent } from './assign-users/assign-users.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    WelcomeComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    CreateProjectComponent,
    EditProjectComponent,
    CreateClientComponent,
    EditClientComponent,
    ManageUsersComponent,
    AssignUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
