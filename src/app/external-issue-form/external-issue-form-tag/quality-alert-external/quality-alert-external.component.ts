import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from '../../../Service/utility-service.service';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';
import {Disposition} from 'src/app/Model/disposition';
import {RestAPIService} from 'src/app/Service/restAPIService/rest-apiservice.service';


@Component({
  selector: 'app-quality-alert-external',
  templateUrl: './quality-alert-external.component.html',
  styleUrls: ['./quality-alert-external.component.css']
})
export class QualityAlertExternalComponent implements OnInit {
  constructor(private utilityService:UtilityServiceService,private restAPIService:RestAPIService) { }
  public externalTagData:QualityTagData;
  public dispositionList:Disposition;
  public dispostionKey='Dispoisition';
  ngOnInit() {
    this.externalTagData=this.utilityService.getTagData();
    this.getDispositionList();
    console.log(this.externalTagData);
    }

  focusOutFunction($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.externalTagData.Issuedby = val;
    this.utilityService.setTagData(this.externalTagData);
  }
  getDispositionList(){
    this.restAPIService.getDisposition().subscribe(
      (data: any) => {
        this.dispositionList=data;
      return this.dispositionList;   
       
       }
    )
  }
  //event handler to get the selected value of reason
  getSelectedDisposition(event: any) {
    console.log("select reason num", event.Dispoisition);
    this.externalTagData.DispositionStackpole = event.Dispoisition;
    this.utilityService.setTagData(this.externalTagData);

  }

}
