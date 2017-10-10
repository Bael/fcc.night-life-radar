import { Component, Input, OnInit } from '@angular/core';
import { Place } from "./place";
import { PlaceService } from "./place.service";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { User } from "./user";
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor (private placeService : PlaceService, 
    private userService : UserService,
     private authService:AuthService) {}

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

  ///@Input() currentUser:User = null;
  

  

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  
  signOut(): void {
    this.authService.signOut();
  }

  /*
  login() :void  {
    let user = new User();
    user.id = "dk";
    user.firstName = "Greg";
    
    this.userService.setCurrentUser(user);
    this.currentUser = user;
  }
  */
  
  places:Place[];
  

}
