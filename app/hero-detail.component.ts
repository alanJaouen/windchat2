import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Http, Headers } from '@angular/http';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: [ 'hero-detail.component.css', 'hero-detail.component2.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  image:string;
  image2:string;
  imageb:boolean = false;



  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private http:Http
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero())
      .subscribe(hero => this.hero = hero);
  }

  changeListener($event) : void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image2 = myReader.result.substring(22,myReader.result.len);
    this.image = myReader.result;
    this.imageb = true;
  }
  myReader.readAsDataURL(file);
}

  goBack(): void {
    this.change();
  }

  reset() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
    headers.append('Authorization', 'Bearer ' + this.hero.token);
    this.http
      .get('http://windchatapi.3ie.fr/api/user/profile', {
        headers: headers
      })
      .subscribe(data => {
        console.log(JSON.stringify(data.json()));
        this.hero.email=data.json().email;
        this.hero.id=data.json().id;
        this.hero.userName=data.json().userName;
        this.hero.firstName=data.json().firstName;
        this.hero.lastName=data.json().lastName;
        this.hero.birthday=data.json().birthday;
        this.hero.pictureUrlSmall=data.json().pictureUrlSmall;
        this.hero.subscribeDay=data.json().subscribeDay;
        this.imageb = false;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
    }

  delete() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
    headers.append('Authorization', 'Bearer ' + this.hero.token);
    this.http
      .delete('http://windchatapi.3ie.fr/api/user/profile', {
        headers: headers
      })
      .subscribe(data => {
        alert('account deleted');
        console.log(JSON.stringify(data.json()));
      }, error => {
        alert('ERROR: account not deleted');        
        console.log(JSON.stringify(error.json()));
      });
    }

     change() {

        var body;
        if (!this.imageb) 
          body ={
            "email": this.hero.email,
            "firstName": this.hero.firstName,
            "lastName": this.hero.lastName,
            "birthday": this.hero.birthday,
            "imageStr64": this.hero.imageStr64
          };
        else        
          body ={
            "email": this.hero.email,
            "firstName": this.hero.firstName,
            "lastName": this.hero.lastName,
            "birthday": this.hero.birthday,
            "imageStr64": this.image2
          };
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
      headers.append('Authorization', 'Bearer ' + this.hero.token);
      this.http
        .put('http://windchatapi.3ie.fr/api/user/profile',
          body, {
            headers: headers
          })
          .subscribe(data => {
                alert('ok');
              console.log(JSON.stringify(data.json()));
              this.hero.pictureUrlSmall=data.json().pictureUrlSmall;

              
          }, error => {
              alert("Error while check credentials.")
          });


     
    }


}