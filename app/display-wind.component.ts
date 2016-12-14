import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Http, Headers } from '@angular/http';



import { Hero }         from './hero';
import { HeroService }  from './hero.service';
//import { Test }  from './map.component';


@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'display-wind.component.html',
  styleUrls: [ 'hero-detail.component.css' ]
})
export class DisplayWindComponent implements OnInit {
  hero: Hero;
  winds: Hero[];

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private http:Http
  ) {
      setTimeout(() => {
      this.reset();
    }, 2000);
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero())
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  reset() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
    headers.append('Authorization', 'Bearer ' + this.hero.token);
    this.http
      .get('http://windchatapi.3ie.fr/api/wind/list', {
        headers: headers
      })
      .subscribe(data => {
        this.winds =<Hero[]>data.json();
        console.log(JSON.stringify(data.json()));

      }, error => {
        console.log(JSON.stringify(error.json()));
      });
        setTimeout(()=>{ console.log(this.winds);}, 3000);
     
    }
}
