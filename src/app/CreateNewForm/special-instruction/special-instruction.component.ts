/**
 * @ngdoc directive
 * @name Special Instruction  Component
 * @element Input labels, Text Areas
 * @description
 * Special Instruction component shows input labels for creating the internal tag.
 * 
 * -------Functions-----------
 * Add Days
 **/
import { Component, OnInit } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import{UtilityServiceService} from '../../Service/utility-service.service'
import { Router } from '@angular/router';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';

@Component({
  selector: 'app-special-instruction',
  templateUrl: './special-instruction.component.html',
  styleUrls: ['./special-instruction.component.css']
})
export class SpecialInstructionComponent implements OnInit {  
  constructor(public restAPIService: RestAPIService,public utilityService:UtilityServiceService,private router: Router) { }
  public internalTagData:QualityTagData;
  expiredOn: Date;
  ngOnInit() { 
   this.internalTagData=this.utilityService.getTagData();
   console.log("hold part",this.internalTagData);
 } 
 addDays() {
  this.expiredOn= this.utilityService.addDays(this.internalTagData.Lengthofchange);
  console.log(this.expiredOn);
} 
  
}
