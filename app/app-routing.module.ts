import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { LoginFormComponent }   from './login-form.component';
import { RegisterFormComponent }from './register-form.component';
import { FriendComponent }     from './friend.component';
import { SendWindComponent }     from './SendWindComponent';
//import { PendingFriendsComponent }from './pending-friend.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'login',  component: LoginFormComponent },
  { path: 'register',  component: RegisterFormComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  { path: 'detail', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent },
  { path: 'friends',     component: FriendComponent },
  { path: 'winds',     component: SendWindComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

