import 'rxjs/add/operator/switchMap';
import { Http, Headers } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';
@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'register-form.component.html',
  styleUrls: [ 'hero-detail.component.css', 'login-form.component.css' ]
})
export class RegisterFormComponent implements OnInit {
  hero: Hero;
  model:Hero;
  submitted = false;
  

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private http:Http,
    private router:Router
  ) {}



  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero())
      .subscribe(hero => this.hero = hero);
    this.model = new Hero();
    this.model.birthday= "1912-06-23T00:00:00";
  }

  goBack(): void {
    this.location.back();
  }


changeListener($event) : void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.model.imageStr64 = myReader.result.split(/,(.+)/)[1]
  }
  myReader.readAsDataURL(file);
}


  onSubmit() {
      var obj =  JSON.stringify(this.model);
      this.testRequest();
      this.submitted = true;
     }


    testRequest() {
      var body = JSON.stringify(this.model);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');


      this.http
        .post('http://windchatapi.3ie.fr/api/user/register',
          body, {
            headers: headers
          })
          .subscribe(data => {
              alert("Registration complete.");
              this.router.navigateByUrl("/login"); 

          }, error => {
              alert(error.json().message);
          });
    }
}
