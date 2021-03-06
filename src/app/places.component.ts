import { Component, Input, OnInit } from '@angular/core';
import { Place } from "./place";
import { PlaceService } from "./place.service";

import { AuthService } from "./auth.service";
import { GoogleLoginProvider } from "./google.login.provider";
import { User } from "./user";

@Component({
  selector: 'places',
  templateUrl: './places.component.html',
  styleUrls:['./places.component.css']

})
export class PlacesComponent implements OnInit {
  constructor(private placeService: PlaceService, private authService: AuthService) { }


  location:String;

  
  isLoading : boolean = false;
  getPlaces(location: String): void {
    this.location = location;
    this.isLoading = true;
    console.log(`get places called with location ${location}`);
    this.placeService.getPlacesByLocation(location)
      .then(placesJson => {
        this.places = placesJson;
        this.isLoading = false;
        
      }) .catch(reason => {                          
        this.isLoading = false;
        console.log("error occured:\n \t " + reason.toString());
        this.places = [];
        
      });


  
  
    }

    goToPlace(place: Place): void {
      
          let userToken: String = this.user.token;
          this.placeService.goToPlace(place.placeId, userToken, new Date())
            .then(result => {
              place.count += 1;
              console.log(result);
              place.uservisitid = result;
              place.uservisit = true;
            }).catch(reason => {
              console.log("error occured:\n \t " + reason)
            });
        }
      
  notGoToPlace(place: Place): void {
    let userId: String = this.user.id;
    this.placeService.unGoToPlace(place.uservisitid)
      .then(result => {
        //console.log("success ungo");
        place.count -= 1;
        place.uservisit = false;
        place.uservisitid = null;
      }).catch(reason => {
        console.log("error occured:\n \t " + reason)
      });

  }

  public user: User;
  private loggedIn: boolean;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      //console.log(user);
      this.loggedIn = (user != null);
      if(this.loggedIn && this.location != null){
        this.getPlaces(this.location)
      }
      
    }, (error) => {
      console.log(error);
    });
  }

  places: Place[];


}
