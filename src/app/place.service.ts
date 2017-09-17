import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Place } from './place';
@Injectable()
export class PlaceService {

  constructor(private http: Http) { }

  getPlacesByLocation(location:String) : Promise<Place[]> {
    //let requestOptions = new RequestOptions();
    //requestOptions.params.append("location", location);
    
    return new Promise((resolve, reject) => {
      this.http.get(`/places?location=${location}`)
        .map(res => res.json())
        .subscribe(res => {
          
          

          resolve(res as Place[]);
        }, (err) => {
          reject(err);
        });
    });
  }

}
