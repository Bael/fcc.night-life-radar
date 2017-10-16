import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PlaceService } from './place.service';
import { UserService } from './user.service';
import { RouterModule }   from '@angular/router';
import { PlacesComponent } from './places.component';

import { GoogleLoginProvider} from "./google.login.provider";
import { AuthService } from "./auth.service";

 
/*
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("47930794826-jivr6f6dq1cdrmqfti3si6msh8idc84i.apps.googleusercontent.com")
  }
]);
export function provideConfig() {
  return config;
}
*/
@NgModule({
  declarations: [
    AppComponent, PlacesComponent   ],
  imports: [
    BrowserModule, HttpModule
    
  
   
  ],
  providers: [PlaceService, UserService, AuthService, GoogleLoginProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
