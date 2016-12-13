import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { FRIEN } from './mock-heroes';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';



@Injectable()
export class HeroService {

  getHero(): Promise<Hero> {
    return Promise.resolve(HEROES);
  }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(FRIEN);
  }
  getHeros(): Hero {
    return HEROES;
  }


}
