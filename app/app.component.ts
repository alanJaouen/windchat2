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
      <a routerLink="/dashboard" (click)="menu = !menu;" routerLinkActive="active">Home</a><br/>
      <a *ngIf="!this.heroService.getHeros().isLog" routerLink="/login" (click)="menu = !menu;" routerLinkActive="active">Login</a><br/>
      <a *ngIf="!this.heroService.getHeros().isLog" routerLink="/register" (click)="menu = !menu;" routerLinkActive="active">Register</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/detail" (click)="menu = !menu;" routerLinkActive="active">Account</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/pass" (click)="menu = !menu;" routerLinkActive="active">Change password</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/friends" (click)="menu = !menu;" routerLinkActive="active">Friends</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/winds" (click)="menu = !menu;" routerLinkActive="active">Send winds</a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/display" (click)="menu = !menu;" routerLinkActive="active">Display winds</a><br/><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/dashboard" (click)="this.load(); this.hero.isLog=false" routerLinkActive="active">Disconnect</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  hero:Hero;
  menu:boolean = false;


  constructor(private heroService: HeroService,
   private route: ActivatedRoute,
)
  {}

  load(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero())
      .subscribe(hero => this.hero = hero);
  }
  
}
