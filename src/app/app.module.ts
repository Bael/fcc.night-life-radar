import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Headers, RequestOptions, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PlaceService } from './place.service';
import { RouterModule }   from '@angular/router';
import { PlacesComponent } from './places.component';
import { GoogleLoginProvider} from "./google.login.provider";
import { AuthService } from "./auth.service";
import { HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent, PlacesComponent   ],
  imports: [
    BrowserModule, HttpClientModule
    ,HttpModule
  
   
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },PlaceService, GoogleLoginProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
