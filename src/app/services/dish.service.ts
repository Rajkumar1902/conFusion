import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';

import { Observable } from 'rxjs/Observable';
import { Restangular } from 'ngx-restangular/dist/esm/src/ngx-restangular';
import { ProcessHttpMsgService } from './process-http-msg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class DishService {

  constructor(private restangular: Restangular,
  private processHTTPMsgService: ProcessHttpMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all("dishes").getList();                    
  }

  getDish(id: number): Observable<Dish> {
    return  this.restangular.one("dishes", id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all("dishes").getList({featured: true})
    .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) })
      .catch(error => { return error; } )    };
      
  }
  


