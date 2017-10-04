import { Component, Input, OnInit } from '@angular/core';
import { Place } from "./place";
import { PlaceService } from "./place.service";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { User } from "./user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor (private placeService : PlaceService, private userService : UserService) {}

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


  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  @Input() currentUser:User = null;
  

  

  login() :void  {
    let user = new User();
    user.id = "dk";
    user.firstName = "Greg";
    
    this.userService.setCurrentUser(user);
    this.currentUser = user;
  }
  
  places:Place[];
  

}
