import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import {Partnumber} from 'src/app/Model/partnumber';
import {Reason} from 'src/app/Model/reason';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  constructor(private utilityService: UtilityServiceService, private restAPIService: RestAPIService) {
  }
  tagSummaryList = this.utilityService.getTagsummaryList();
  public partNumberList: Partnumber[];
  public reasonList : Reason[];
  ngOnInit() {
    console.log("calling getPafrtList")
    this.getPartList();
    this.getReasonList();
  }
  getPartList() {    
    this.restAPIService.getPartList().subscribe(
      (data: any) => {
        this.partNumberList = data;    
        console.log("in side menu",this.partNumberList);
        console.log("for 1",this.partNumberList[0]);
       }
    )
  }

  getReasonList() {    
    this.restAPIService.getReasonList().subscribe(
      (data: any) => {
        this.reasonList = data;    
        console.log("in side menu reason list",this.reasonList);
        console.log("for 2",this.reasonList[0]);
       }
    )
  }



}
