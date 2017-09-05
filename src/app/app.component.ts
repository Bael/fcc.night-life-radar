import { Component } from '@angular/core';
import { Place } from "./place";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  places:Place[] = [{name:"harats", count:20}, {name:'brugge', count:10}];
  

}
