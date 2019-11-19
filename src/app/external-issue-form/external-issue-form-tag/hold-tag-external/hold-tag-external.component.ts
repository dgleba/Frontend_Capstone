import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';
import {ExternalTagData} from '../../../Model/externalTagData';

@Component({
  selector: 'app-hold-tag-external',
  templateUrl: './hold-tag-external.component.html',
  styleUrls: ['./hold-tag-external.component.css']
})
export class HoldTagExternalComponent implements OnInit {

  constructor(private utilityService:UtilityServiceService) { }
  public externalTagData=this.utilityService.getExternalTagData();
  ngOnInit() {
  }

}
