import { Component } from '@angular/core';
import { Place } from "./place";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  getPlaces() : void {
    this.places = [{name:"harats", count:20, description:"Best place to drink", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD26b7HWdVeWE_pdhkORUtUgnnpN1-CDs4_VVFg1Wtd2nwoHSrbve4nSLH"}, 
    {name:'brugge', count:10, description:"Best place to eat", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNcNt5ppNb9tGV_0CJPUy39hgep1TTPwx11up1d_DSzh18AJf73q4OLYAc"}];
  }

  goToPlace(place:Place) :void {
    place.count = place.count.valueOf() + 1;

  }


  notGoToPlace(place:Place) :void {
    place.count = place.count.valueOf() - 1;

  }

  currentUser = null;

  login() :void  {
    this.currentUser = "Gregg";
  }
  
  places:Place[];
  

}
