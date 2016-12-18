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
      <a routerLink="/dashboard" (click)="menu = !menu;" routerLinkActive="active">
         <img src="../res/home.png"><span>Home</span>
      </a><br/>
      <a *ngIf="!this.heroService.getHeros().isLog" routerLink="/login" (click)="menu = !menu;" routerLinkActive="active">
        <img src="../res/login.png"><span>Login</span>
      </a><br/>
      <a *ngIf="!this.heroService.getHeros().isLog" routerLink="/register" (click)="menu = !menu;" routerLinkActive="active">
        <img src="../res/register.png"><span>Register</span>
      </a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/detail" (click)="menu = !menu;" routerLinkActive="active">
        <img src="../res/account.png"><span>Account</span>
      </a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/pass" (click)="menu = !menu;" routerLinkActive="active">
        <img src="../res/key.png"><span>Change password</span>
      </a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/friends" (click)="menu = !menu;" routerLinkActive="active">
        <img src="../res/friend.png"><span>Friends</span>
      </a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/winds" (click)="menu = !menu;" routerLinkActive="active">
        <img src="../res/send.png"><span>Send winds</span>
      </a><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/display" (click)="menu = !menu;" routerLinkActive="active">
        <img src="../res/wind.png"><span>Display winds</span>
      </a><br/><br/>
      <a *ngIf="this.heroService.getHeros().isLog" routerLink="/dashboard" (click)="this.load(); this.hero.isLog=false" routerLinkActive="active">
       <img src="../res/out.png"><span>Disconnect</span>
      </a>
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
