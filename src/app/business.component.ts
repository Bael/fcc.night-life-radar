import { Component, OnInit, Input } from '@angular/core';
import { Place } from "./place";

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { PlaceService } from "./place.service";
import { UserService } from "./user.service";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'business-info',
  templateUrl: './business.component.html'
  
})

export class BusinessComponent  {
  constructor (private placeService : PlaceService, private userService : UserService,  private route: ActivatedRoute,
    private location: Location) {}

  
    ngOnInit(): void {
        this.route.paramMap
          .switchMap((params: ParamMap) => this.placeService.getBusinessInfo(+params.get('id')))
          .subscribe(placeInfo => this.placeInfo = placeInfo);
      }

  

  @Input() place: Place;

  placeInfo:Place;

  goBack(): void {
    
    this.location.back();
  }

}
