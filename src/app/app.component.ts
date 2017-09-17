import { Component, OnInit } from '@angular/core';
import { Place } from "./place";
import { PlaceService } from "./place.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor (private placeService : PlaceService) {}

  
  getPlaces(location:String) : void {

    console.log(`get places called with location ${location}`);
    
    this.placeService.getPlacesByLocation(location)
      .then(placesJson => {
        this.places = placesJson;
        console.log(placesJson);
      }).catch( reason =>  {
        console.log("error occured:\n \t " + reason)
       }) ;
      
    
  }

  goToPlace(place:Place) :void {
    place.count = place.count.valueOf() + 1;

  }


  notGoToPlace(place:Place) :void {
    place.count = place.count.valueOf() - 1;

  }

  currentUser = null;

  login() :void  {
    this.currentUser = "Gregg";
  }
  
  places:Place[];
  

}
