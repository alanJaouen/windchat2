import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a *ngIf="!this.heroService.getHeros().isLog" routerLink="/login" routerLinkActive="active">login</a>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/detail" routerLinkActive="active">detail</a>
      <a *ngIf="!this.heroService.getHeros().isLog" routerLink="/register" routerLinkActive="active">register</a>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/friends" routerLinkActive="active">friends</a>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/winds" routerLinkActive="active">winds</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  title = 'windshot';
  hero:Hero;


  constructor(private heroService: HeroService)
  {}
  
}
