/**
 * @ngdoc directive
 * @name Hold Tag Component
 * @element Input labels 
 * @function 
 * Preview pictures and document,
 * Check if image is set,
 * Get Documents from the html,
 * Validate MIME type.
 * @description
 * Hold Tag component shows the various labels to submit the form
 * 
 * 
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
