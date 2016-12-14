import 'rxjs/add/operator/switchMap';
import { Component, OnInit , Directive, ElementRef, Renderer}      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private http:Http,
    private router: Router
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

    open(event) 
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
        headers.append('Authorization', 'Bearer ' + this.hero.token);
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        alert("seen: "+value);
        this.router.navigateByUrl("/show?id="+value);

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
