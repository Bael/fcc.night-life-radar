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
      this.http.get(`/places?location=${location}&userId=dk`)
        .map(res => res.json())
        .subscribe(res => {
          
          

          resolve(res as Place[]);
        }, (err) => {
          reject(err);
        });
    });
  }



  goToPlace(placeId:String, userId:String, date:Date) : Promise<any> {
    //let requestOptions = new RequestOptions();
    //requestOptions.params.append("location", location);
    let body = {placeId, userId, date};
    return new Promise((resolve, reject) => {
      this.http.post(`/places`, body)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  

}
