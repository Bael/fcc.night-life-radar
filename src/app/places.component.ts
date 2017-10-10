import { Component, Input, OnInit } from '@angular/core';
import { Place } from "./place";
import { PlaceService } from "./place.service";
import { UserService } from "./user.service";
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";

@Component({
  selector: 'places',
  templateUrl: './places.component.html'
  
})
export class PlacesComponent implements OnInit {
  constructor (private placeService : PlaceService, private userService : UserService, private authService:AuthService) {}

  selectedPlace:Place = null;
 
  gotoDetail(place): void {
      console.log(place);

    this.selectedPlace = place;

  }

  goToPlace(place:Place) :void {

    let userId : String = this.user.id;
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
  notGoToPlace(place:Place) :void {
    let userId : String = this.user.id;
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

  public user: SocialUser;
  private loggedIn: boolean;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      
      console.log(user);

      this.loggedIn = (user != null);
    }, (error) => {
      console.log(error);
      
    });

    //this.currentUser = this.userService.getCurrentUser();
  }

  
  


  places:Place[];
  

}
