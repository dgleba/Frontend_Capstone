import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';
import {ExternalTagData} from '../../../Model/externalTagData';
@Component({
  selector: 'app-picture-external',
  templateUrl: './picture-external.component.html',
  styleUrls: ['./picture-external.component.css']
})
export class PictureExternalComponent implements OnInit {
  constructor(private utilityService:UtilityServiceService) { }
  public externalTagData=this.utilityService.getExternalTagData();
  ngOnInit() {
    this.externalTagData.isPictureComponent=true;
    this.utilityService.setExternalTagData(this.externalTagData);
  }

}
