import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PlaceService } from './place.service';
import { UserService } from './user.service';
import { BusinessComponent } from './business.component';
import { RouterModule }   from '@angular/router';

@NgModule({
  declarations: [
    AppComponent, BusinessComponent
  ],
  imports: [
    BrowserModule, HttpModule,
    RouterModule.forRoot([
      {
        path: 'cards/:id',
        component: BusinessComponent
      }
    ])
  ],
  providers: [PlaceService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
