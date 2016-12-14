import 'rxjs/add/operator/switchMap';
import { Http, Headers } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'login-form.component.html',
  styleUrls: [ 'hero-detail.component.css', 'login-form.component.css' ]
})
export class LoginFormComponent implements OnInit {
  hero: Hero;
  model = new Hero();

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private http:Http
  ) {

  }



  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero())
      .subscribe(hero => this.hero = hero);
          this.route.params
  }

  goBack(): void {
    this.location.back();
  }



  onSubmit() {
      var obj =  JSON.stringify(this.model);
      console.log(obj);
      this.testRequest();
     }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


    newHero() {
        this.model = new Hero();
    }

    testRequest() {
      var body = JSON.stringify(this.model);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
      console.log(body);


      this.http
        .post('http://windchatapi.3ie.fr/api/user/login',
          body, {
            headers: headers
          })
          .subscribe(data => {
                alert('ok');
              console.log(JSON.stringify(data.json()));
              this.hero.email=data.json().email;
              this.hero.id=data.json().id;
              this.hero.userName=data.json().userName;
              this.hero.firstName=data.json().firstName;
              this.hero.lastName=data.json().lastName;
              this.hero.birthday=data.json().birthday;
              this.hero.token=data.json().token;
              this.hero.pictureUrlSmall=data.json().pictureUrlSmall;
              this.hero.subscribeDay=data.json().subscribeDay;

              this.hero.isLog=true;
              
          }, error => {
              alert("Error while check credentials.")
          });


     
    }
}
