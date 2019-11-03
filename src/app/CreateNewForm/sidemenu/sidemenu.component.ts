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
  public selectedPartNum: string = '';
  ngOnInit() {
    this.getPartList();
    this.getReasonList();
  }  

  //event handler to get the selected value of part num
  getSelectedPartNumber (event: any) {
    
    this.selectedPartNum = event.target.value;
    this.utilityService.setSelectedPartNum(this.selectedPartNum);
    
  }
  getSelectedTag (id:number) {
    var updatedObjectArray=this.utilityService.getTagsummaryList();
    var updatedObj=updatedObjectArray[id];
    updatedObj.isChecked=!updatedObj.isChecked;
   this.utilityService.setUpdatedTagSummaryObject(updatedObj,id);
  
  }
  getPartList() {    
    this.restAPIService.getPartList().subscribe(
      (data: any) => {
        this.partNumberList = data;    
       
       }
    )
  }

  getReasonList() {    
    this.restAPIService.getReasonList().subscribe(
      (data: any) => {
        this.reasonList = data;    
       }
    )
  }



}
