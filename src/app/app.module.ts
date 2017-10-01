import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PlaceService } from './place.service';
import { UserService } from './user.service';
import { PlaceDetailComponent } from './place-detail.component';
import { RouterModule }   from '@angular/router';
import { PlacesComponent } from './places.component';
@NgModule({
  declarations: [
    AppComponent, PlaceDetailComponent, PlacesComponent
  ],
  imports: [
    BrowserModule, HttpModule
  
   
  ],
  providers: [PlaceService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
