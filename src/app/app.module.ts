import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PlaceService } from './place.service';
import { UserService } from './user.service';
import { PlaceDetailComponent } from './place-detail.component';
import { RouterModule }   from '@angular/router';
import { PlacesComponent } from './places.component';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("47930794826-jivr6f6dq1cdrmqfti3si6msh8idc84i.apps.googleusercontent.com")
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent, PlaceDetailComponent, PlacesComponent
  ],
  imports: [
    BrowserModule, HttpModule,
    SocialLoginModule
  
   
  ],
  providers: [PlaceService, UserService, 
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
