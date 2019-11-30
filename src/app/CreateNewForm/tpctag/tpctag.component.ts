import { Component, OnInit } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service';
import {UtilityServiceService} from '../../Service/utility-service.service';
import {QualityTagData} from '../../Model/qualtiyTagData';
import {ProcessStep} from '../../Model/processStep';
import {MachineStep} from '../../Model/machine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tpctag',
  templateUrl: './tpctag.component.html',
  styleUrls: ['./tpctag.component.css']
})
export class TpctagComponent implements OnInit {
 
  constructor(public restAPIService: RestAPIService,public utilityService:UtilityServiceService,private router: Router) { }
  public internalTagData:QualityTagData;
  ngOnInit() { 
   this.internalTagData=this.utilityService.getTagData();
   console.log("tpc part",this.internalTagData);
 }  
 
}
