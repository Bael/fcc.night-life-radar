import { Component, OnInit } from '@angular/core';
import { Place } from "./place";
import { PlaceService } from "./place.service";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor (private placeService : PlaceService, private userService : UserService, private router : Router) {}

   /*
  getPlaces(location:String) : void {

    console.log(`get places called with location ${location}`);
    
    this.placeService.getPlacesByLocation(location)
      .then(placesJson => {
        this.places = placesJson;
        console.log(placesJson);
      }).catch( reason =>  {
        console.log("error occured:\n \t " + reason)
       });
      
    
  }

  gotoDetail(place): void {
    this.router.navigate(['/cards', place.placeId],  {skipLocationChange: false});
  }

  goToPlace(place:Place) :void {

    let userId : String = this.userService.getCurrentUserId();
    this.placeService.goToPlace(place.placeId, userId, new Date())
    .then(result => {
      console.log("success go");
      place.count += 1;
      place.uservisitid = result;
      place.uservisit = true;

      
    }).catch( reason =>  {
      console.log("error occured:\n \t " + reason)
     }) ;
    
    

  }


  notGoToPlace(place:Place) :void {
    let userId : String = this.userService.getCurrentUserId();
    this.placeService.unGoToPlace(place.uservisitid)
    .then(result => {
      console.log("success ungo");
      place.count -= 1;
      place.uservisit = false;
      place.uservisitid = null;

      
    }).catch( reason =>  {
      console.log("error occured:\n \t " + reason)
     }) ;
    
    
    

  }
  */

  currentUser = null;

  login() :void  {
    this.currentUser = "Gregg";
  }
  
  places:Place[];
  

}
