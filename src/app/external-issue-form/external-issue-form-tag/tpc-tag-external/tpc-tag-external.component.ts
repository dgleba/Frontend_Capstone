import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';
import {ExternalTagData} from '../../../Model/externalTagData';
@Component({
  selector: 'app-tpc-tag-external',
  templateUrl: './tpc-tag-external.component.html',
  styleUrls: ['./tpc-tag-external.component.css']
})
export class TpcTagExternalComponent implements OnInit {

  constructor(private utilityService:UtilityServiceService) { }
  public externalTagData=this.utilityService.getExternalTagData();
  ngOnInit() {
    this.externalTagData.isPictureComponent=false;
    this.utilityService.setExternalTagData(this.externalTagData);
  }

}
