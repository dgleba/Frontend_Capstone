/**
 * @ngdoc Component
 * @name rfx.component:holdtag
 * @element  Quantity and Body elements
 * @function 
 *
 * @description
 * Hold Tag - Internal view.
 *
 * 
 **/
import { Component, OnInit } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import { UtilityServiceService } from '../../Service/utility-service.service'
import { Router } from '@angular/router';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';



@Component({
  selector: 'app-holdtag',
  templateUrl: './holdtag.component.html',
  styleUrls: ['./holdtag.component.css']
})
export class HoldtagComponent implements OnInit {
  constructor(public restAPIService: RestAPIService,public utilityService:UtilityServiceService,private router: Router) { }
  public internalTagData:QualityTagData;
   ngOnInit() { 
    this.internalTagData=this.utilityService.getTagData();
    console.log("hold part",this.internalTagData);
  } 
  
 
 
}
