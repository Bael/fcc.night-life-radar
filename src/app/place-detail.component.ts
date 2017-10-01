import { Component, OnInit, Input } from '@angular/core';
import { Place } from "./place";

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { PlaceService } from "./place.service";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'place-detail-info',
  templateUrl: './place-detail.component.html'
  
})

export class PlaceDetailComponent  {
  constructor (private placeService : PlaceService, private userService : UserService,  private route: ActivatedRoute,
    private location: Location, private router : Router) {}

  
    ngOnInit(): void {
        this.route.paramMap
          .switchMap((params: ParamMap) => this.placeService.getBusinessInfo(+params.get('id')))
          .subscribe(placeInfo => this.placeInfo = placeInfo);
      }

  

  @Input() place: Place;

  placeInfo:Place;

  goBack(): void {
    this.router.navigate(['/cards'],  {skipLocationChange: false});
    //this.location.back();
  }

}
