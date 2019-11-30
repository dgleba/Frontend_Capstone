import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from '../../../Service/utility-service.service';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';

@Component({
  selector: 'app-quality-alert-external',
  templateUrl: './quality-alert-external.component.html',
  styleUrls: ['./quality-alert-external.component.css']
})
export class QualityAlertExternalComponent implements OnInit {
  constructor(private utilityService:UtilityServiceService) { }
  public externalTagData:QualityTagData;
  ngOnInit() {
    this.externalTagData=this.utilityService.getTagData();
    console.log(this.externalTagData);
    }

  focusOutFunction($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.externalTagData.Issuedby = val;
    this.utilityService.setTagData(this.externalTagData);
  }

}
