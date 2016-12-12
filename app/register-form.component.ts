import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'login-form.component.html',
  styleUrls: [ 'hero-detail.component.css' ]
})
export class HeroFormComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  model = new Hero(18, 'Dr IQ');
  submitted = false;
  onSubmit() {
      var obj =  JSON.stringify(this.model);
      console.log(obj);
      this.submitted = true;
     }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
    newHero() {
        this.model = new Hero(42, '');
    }
}
