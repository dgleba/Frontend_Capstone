import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from '../../../Service/utility-service.service';
import {ExternalTagData} from '../../../Model/externalTagData';

@Component({
  selector: 'app-quality-alert-external',
  templateUrl: './quality-alert-external.component.html',
  styleUrls: ['./quality-alert-external.component.css']
})
export class QualityAlertExternalComponent implements OnInit {
  constructor(private utilityService:UtilityServiceService) { }
  public externalTagData:ExternalTagData;
  ngOnInit() {
    this.externalTagData=this.utilityService.getExternalTagData();
    }

  focusOutFunction($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.externalTagData.textIssuedBy = val;
    this.utilityService.setExternalTagData(this.externalTagData);
  }

}
