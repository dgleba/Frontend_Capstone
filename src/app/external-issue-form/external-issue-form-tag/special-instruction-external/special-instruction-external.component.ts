import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';
import {ExternalTagData} from '../../../Model/externalTagData';
@Component({
  selector: 'app-special-instruction-external',
  templateUrl: './special-instruction-external.component.html',
  styleUrls: ['./special-instruction-external.component.css']
})
export class SpecialInstructionExternalComponent implements OnInit {

  constructor(private utilityService:UtilityServiceService) { }
  public externalTagData=this.utilityService.getExternalTagData();
  ngOnInit() {
    this.externalTagData.isPictureComponent=false;
    this.utilityService.setExternalTagData(this.externalTagData);
  }

}
