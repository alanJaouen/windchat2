import 'rxjs/add/operator/switchMap';
import {Subscription } from 'rxjs';
import { Component, OnInit, Input}      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Http, Headers } from '@angular/http';



import { Hero }         from './hero';
import { HeroService }  from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'show-wind.component.html',
  styleUrls: [ 'hero-detail.component.css', 'show-wind.component.css' ]
})
export class ShowWindComponent implements OnInit {
  hero: Hero;
  winds: Hero[] = [];
  id: number;
  duration: number = 10;
  private subscription: Subscription;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private http:Http
  ) {
    
    setTimeout(() => {
      this.reset();
    }, 1000);

  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(
      (param: any) => {
        this.id = param['id'];
      });
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero())
      .subscribe(hero => this.hero = hero);

  }

  wait(event):void
  {
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id;
      this.duration = idAttr.nodeValue;
      setTimeout(() => {
        this.goBack();
      }, this.duration);
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

        
        setTimeout(()=>{ this.goBack()}, 11000);
        setInterval(()=>{ this.duration = this.duration - 1 ; }, 1000);
        

      }, error => {
        console.log(JSON.stringify(error.json()));
      });

      
     
    }

    open(event) 
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
        headers.append('Authorization', 'Bearer ' + this.hero.token);
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;

       /* this.http
        .delete('http://windchatapi.3ie.fr/api/friend/' + value , {
            headers: headers
        })
        .subscribe(data => {
            alert('contact deleted');
            console.log(JSON.stringify(data.json()));
        }, error => {
            alert('ERROR: contact not deleted');        
            console.log(JSON.stringify(error.json()));
        });*/
    }
}
