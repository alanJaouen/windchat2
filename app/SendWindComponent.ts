import 'rxjs/add/operator/switchMap';
import { Http, Headers } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './hero';
import { Wind }         from './wind';
import { HeroService }  from './hero.service';
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'sendWind.component.html',
  styleUrls: [ 'hero-detail.component.css', 'sendWind.component.css' ]
})
export class SendWindComponent implements OnInit {
  hero: Hero;
  model:Wind;
  friends:Hero[];
  image:string;
  

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private http:Http
  ) {}


setPosition(position){
      this.model.latitude = position.coords.latitude;
      this.model.longitude = position.coords.longitude;
      }


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero())
      .subscribe(hero => this.hero = hero);
    this.route.params
      .switchMap((params: Params) => this.heroService.getHeroes())
      .subscribe(friends => this.friends = friends);
    this.model = new Wind();
       if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      };
  }

  goBack(): void {
    this.location.back();
  }

 getfriends() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
    headers.append('Authorization', 'Bearer ' + this.hero.token);
    this.http
      .get('http://windchatapi.3ie.fr/api/friend/list', {
        headers: headers
      })
      .subscribe(data => {
        this.friends =<Hero[]>data.json();
        console.log(JSON.stringify(data.json()));

      }, error => {
        console.log(JSON.stringify(error.json()));
      });
    }

changeListener($event) : void {
    this.getfriends();
    this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.model.image = myReader.result.substring(22,myReader.result.len);
    this.image = myReader.result;
  }
  myReader.readAsDataURL(file);
}


  onSubmit() {
      this.testRequest();
      this.model = new Wind();
      this.image = null;
  }

    testRequest() {
      var body = JSON.stringify(this.model);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
      headers.append('Authorization', 'Bearer ' + this.hero.token);

      this.http
        .post('http://windchatapi.3ie.fr/api/wind',
          body, {
            headers: headers
          })
          .subscribe(data => {
            alert("Your wind has been send")
          }, error => {
              alert(error.json().message);
          });
    }

    checked(value) {
        if ((<HTMLInputElement>document.getElementById(value)).checked === true) {
            this.model.recipients.push(value);
        }
        else if ((<HTMLInputElement>document.getElementById(value)).checked === false) {
            let indexx = this.model.recipients.indexOf(value);
            this.model.recipients.splice(indexx,1)
        }
    }
}
