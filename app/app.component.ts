import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
  <header>
    <img id="menu" (click)="menu = !menu;" src="../res/menu.png">
  
    <img id="topLogo" src="../res/windchat-logo-white-banner.png">
  </header>
    <nav *ngIf="menu">
      <a routerLink="/dashboard" routerLinkActive="active">Home</a><br/>
      <a *ngIf="!this.heroService.getHeros().isLog" routerLink="/login" routerLinkActive="active">Login</a><br/>
      <a *ngIf="!this.heroService.getHeros().isLog" routerLink="/register" routerLinkActive="active">Register</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/detail" routerLinkActive="active">Account</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/friends" routerLinkActive="active">Friends</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/winds" routerLinkActive="active">Send winds</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/display" routerLinkActive="active">Display winds</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  hero:Hero;
  menu:boolean = false;


  constructor(private heroService: HeroService)
  {}
  
}
