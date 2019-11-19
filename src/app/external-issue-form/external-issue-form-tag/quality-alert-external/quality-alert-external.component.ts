import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';
import {ExternalTagData} from '../../../Model/externalTagData';

@Component({
  selector: 'app-quality-alert-external',
  templateUrl: './quality-alert-external.component.html',
  styleUrls: ['./quality-alert-external.component.css']
})
export class QualityAlertExternalComponent implements OnInit {

  constructor(private utilityService:UtilityServiceService) { }
  public externalTagData=this.utilityService.getExternalTagData();
  ngOnInit() {
    this.externalTagData.isPictureComponent=false;
    this.utilityService.setExternalTagData(this.externalTagData);
  }

 

}
