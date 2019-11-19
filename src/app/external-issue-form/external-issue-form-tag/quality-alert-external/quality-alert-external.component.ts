import { Component, OnInit } from '@angular/core';
import {ExternalUtilityServiceService} from 'src/app/Service/external-utility-service';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';

@Component({
  selector: 'app-quality-alert-external',
  templateUrl: './quality-alert-external.component.html',
  styleUrls: ['./quality-alert-external.component.css']
})
export class QualityAlertExternalComponent implements OnInit {

  constructor(private externalUtilityService :  ExternalUtilityServiceService, private utilityService:UtilityServiceService) { }
 
  ngOnInit() {}

 

}
