import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import {Partnumber} from 'src/app/Model/partnumber';

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
  ngOnInit() {
    console.log("calling getPafrtList")
    this.getPartList();
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

}
