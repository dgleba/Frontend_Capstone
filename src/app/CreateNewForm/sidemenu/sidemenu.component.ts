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
  public selectedReason: string = '';
  ngOnInit() {
    this.getPartList();
    this.getReasonList();
  }  
  focusOutFunction ($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.utilityService.setIssuedBy(val);
   
 }

  //event handler to get the selected value of part num
  getSelectedPartNumber (event: any) {    
    this.selectedPartNum = event.target.value;
    this.utilityService.setSelectedPartNum(this.selectedPartNum);
    
  }
  getSelectedReason (event: any) {    
    this.selectedReason = event.target.value;
    this.utilityService.setSelectedReason(this.selectedReason);
    
  }
  getSelectedTag (id:number) {
    var updatedObjectArray=this.utilityService.getTagsummaryList();
    var updatedObj=updatedObjectArray[id];
    updatedObj.isChecked=!updatedObj.isChecked;
    updatedObjectArray.tagVlue=1;
   this.utilityService.setUpdatedTagSummaryObject(updatedObj,id);
  
  }

  // api calls start
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
  //api calls end



}
