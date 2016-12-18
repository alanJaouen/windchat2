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
  templateUrl: 'password.component.html',
  styleUrls: [ 'hero-detail.component.css', 'login-form.component.css' ]
})
export class PasswordComponent implements OnInit {
  hero: Hero;
  cPass: string;
  currentPassword: string;
  newPassword: string;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private http:Http,
    private router:Router
  ) {

  }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero())
            .subscribe(hero => this.hero = hero);
    }

  goBack(): void {
    this.location.back();
  }



  onSubmit() {
      this.save();
     }

    save() {
         var body;
         body ={
            "currentPassword": this.currentPassword,
            "newPassword": this.newPassword
          };
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Api-Key', '{MQ1D7W@5O0-EYH4D9PPZC-6<2ZU8I6C0}');
        headers.append('Authorization', 'Bearer ' + this.hero.token);

        this.http
        .put('http://windchatapi.3ie.fr/api/user/password',
          body, {
            headers: headers
          })
          .subscribe(data => {
              console.log(JSON.stringify(data.json()));
              alert("ok");
              this.router.navigateByUrl("/"); 
          }, error => {
              alert("Error while changing password.")
          });

          
    }
}
