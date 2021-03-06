/*modules*/
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*components*/
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import { LoadscreenComponent } from './components/loadscreen/loadscreen.component';
/*services*/
import {AuthService} from './services/auth.service';
/*models*/
import {Patient} from './models/patient';
/*guards*/
import {AuthGuard} from './guards/auth.guard';
import {HttpHandler} from "./util/httphandler";

const routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    DashboardComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    LoadscreenComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    Patient,
    AuthGuard,
    HttpHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
