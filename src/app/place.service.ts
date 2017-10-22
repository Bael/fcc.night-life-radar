import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Place } from './place';
@Injectable()
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlacesByLocation(location:String) : Promise<Place[]> {
    //let requestOptions = new RequestOptions();
    //requestOptions.params.append("location", location);
    
    return new Promise((resolve, reject) => {
      this.http.get(`/visits?location=${location}&userId=dk`)
        .subscribe(res => {
          resolve(res as Place[]);
        }, (err) => {
          reject(err);
        });
    });
  }



  goToPlace(placeId:String, userToken:String, date:Date) : Promise<any> {
    //let requestOptions = new RequestOptions();
    //requestOptions.params.append("location", location);
    let body = {placeId, token:userToken, date};
    return new Promise((resolve, reject) => {
      this.http.post(`/visits/new`, body)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  
  unGoToPlace(uservisitid:String) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`/visits/` + uservisitid)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
