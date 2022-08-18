/*! \file
This file serves as the routing node of the entire project.
Containing Routes parameters for all possible routes available and wildcard routes redirect to home.
*/

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ArenaComponent} from './arena/arena.component';
import {UserComponent} from './user/user.component';
import {IdeComponent} from './ide/ide.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './auth.guard';
import {FileComponent} from './file/file.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'arena/question/:title', component: ArenaComponent, canActivate: [AuthGuard]},
  {path: 'arena/problem/:id', component: ArenaComponent, canActivate: [AuthGuard]},
  {path: 'arena/file/:filepath', component: IdeComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'files', component: FileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'arena', redirectTo: '/arena/file/new'},
  {path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routerComponents = [
  HomeComponent,
  ArenaComponent,
  UserComponent,
  IdeComponent,
  LoginComponent,
  RegisterComponent
];
