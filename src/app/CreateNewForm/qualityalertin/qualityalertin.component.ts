/**
 * @ngdoc Component
 * @name rfx.component:qualityalertin
 * @element  Ok'd By, Length of change and Body elements
 * @function 
 *
 * @description
 * Quality Alert - Internal Tag view.
 *
 * 
 **/
import { Component, OnInit, Input } from '@angular/core';
import { RestAPIService } from '../../Service/restAPIService/rest-apiservice.service'
import { UtilityServiceService } from '../../Service/utility-service.service'
import { Router } from '@angular/router';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';

@Component({
  selector: 'app-qualityalertin',
  templateUrl: './qualityalertin.component.html',
  styleUrls: ['./qualityalertin.component.css']
})
export class QualityalertinComponent implements OnInit {
 constructor(public restAPIService: RestAPIService, public utilityService: UtilityServiceService, private router: Router) { }
  expiredOn: Date;
  public internalTagData:QualityTagData;
  ngOnInit() {
    this.internalTagData=this.utilityService.getTagData();
    console.log("inter part",this.internalTagData);
  }
  addDays() {
    this.expiredOn= this.utilityService.addDays(this.internalTagData.Lengthofchange);
    console.log(this.expiredOn);
  }  
 

}
