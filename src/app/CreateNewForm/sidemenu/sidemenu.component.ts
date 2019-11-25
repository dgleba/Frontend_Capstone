import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import {QualityTagData} from '../../Model/qualtiyTagData';
import {Partnumber} from '../../Model/partnumber';
import {Reason} from '../../Model/reason';
import {ProcessStep} from '../../Model/processStep';
import {MachineStep} from '../../Model/machine';
import { from } from 'rxjs';



@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  constructor(private utilityService: UtilityServiceService, private restAPIService: RestAPIService) {
  }
  partNumId = 'PartID';
  reasonKeyword='Reason';
  processKeyword='Department';
  machineKeyword1='MachineDesc';

  tagSummaryList = this.utilityService.getTagsummaryList();
  public internalTagData;
  public partNumberList:Partnumber[];
  public reasonList:Reason[];
  public processStep:ProcessStep[];
  public machineStep:MachineStep[];
  public processStepId: string;
  public machineStepId: string;
  ngOnInit() { 
    var  qtagData=new QualityTagData();
    this.utilityService.setInternalTagData(qtagData);
    console.log("qta in comman", this.utilityService.getInternalTagData());  
    this.internalTagData=this.utilityService.getInternalTagData(); 
    this.getPartList();
    this.getReasonList();
    this.getProcessList();
    this.getMachineList();
    
  }
  focusOutFunction($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.internalTagData.Issuedby = val;
    this.utilityService.setInternalTagData(this.internalTagData);
  }
  //event handler to get the selected value of part num
  getSelectedPartNumber(event) {
    console.log("select part num", event.PartID);
    this.internalTagData.PartID=event.PartID;
    this.utilityService.setInternalTagData(this.internalTagData);
  }
  
  // part functions closed
  clearData(){
    this.internalTagData.PartID = '';
    this.internalTagData.Reason = '';
    this.internalTagData.ProcessStep = '';
    this.internalTagData.MachineID = '';
    this.getPartList();
    console.log("not part num",this.internalTagData.PartID); 
  }
    //event handler to get the selected value of reason
  getSelectedReason(event) {
    console.log("select reason num", event.Reason);
    this.internalTagData.Reason = event.Reason;
    this.utilityService.setInternalTagData(this.internalTagData);
  }
 
  //event handler to get the selected value of process step
  getSelectedProcessStep(event) {    
    console.log("select process num", event.Department);
    this.internalTagData.ProcessStep = event.Department;
    this.utilityService.setInternalTagData(this.internalTagData);
  }
  //event handler to get the selected value of machine step
  getSelectedMachine(event: any) {
    console.log("select machine num", event.id);
    console.log("select machine des", event.MachineDesc);
    this.internalTagData.MachineID = event.id;
    this.utilityService.setInternalTagData(this.internalTagData);
  }
  //
  getSelectedTag(id: number) {
    console.log("check clicked");
    var updatedObjectArray = this.utilityService.getTagsummaryList();
    var updatedObj = updatedObjectArray[id];
    updatedObj.isChecked = !updatedObj.isChecked;
    this.utilityService.setUpdatedTagSummaryObject(updatedObj, id);
    this.setInternalTagBoolean(this.utilityService.getTagsummaryList());
  }
  setInternalTagBoolean(tagSummaryList) {
    console.log("tag list",tagSummaryList);
    for (let tagsummary of tagSummaryList) {
      switch (tagsummary.id) {
        case '1':
          this.internalTagData.QualityMemo = tagsummary.isChecked;
          break;
        case '2':
            this.internalTagData.HoldTag = tagsummary.isChecked;
          break;
        case '3':
            this.internalTagData.TPCTag = tagsummary.isChecked;
          break;
        case '4':
            this.internalTagData.SpecialInstWritten = tagsummary.isChecked;
          break;
        case '5':
          this.internalTagData.QualityATag = tagsummary.isChecked;
          break;
        case '6':
          this.internalTagData.Supplier_Issue = tagsummary.isChecked;
          break;
      }
    }
    this.utilityService.setInternalTagData(this.internalTagData);
    console.log("internal tag data",this.utilityService.getInternalTagData());
  }
  //api calls start
getPartList() {    
  this.restAPIService.getPartList().subscribe(
    (data: any) => {
      const newData = data.map(({ id:PartID, Description, RptScrap,PlantNumber,url}) => ({
        PartID,
        Description,
        RptScrap,
        PlantNumber,url
    }));    
      this.partNumberList=newData;
      this.utilityService.setPartNumberList(data); 
     },error=>{
      this.restAPIService.setApiErrorResponse(error)
     }
  )
}
// on change part number in auto complete
onChangePartNumber(val: string) {
  console.log("on change search ", val);
  this.restAPIService.getListByContains(val,'','').subscribe((data: any) => {
      this.partNumberList=data; 
     },error=>{
      this.restAPIService.setApiErrorResponse(error)
     }
  )
}
// api call to get reason list
getReasonList() {    
  this.restAPIService.getReasonList().subscribe(
    (data: any) => {      
      this.reasonList=data;
      this.utilityService.setReasonList(data);    
     },error=>{
      this.restAPIService.setApiErrorResponse(error)
     }
  )
}
// on change part number in auto complete
onChangeReasonNumber(val: string) {
  console.log("on change search ", val);
  this.restAPIService.getListByContains('',val,'').subscribe(
    (data: any) => {
      this.reasonList=data; 
     },error=>{
      this.restAPIService.setApiErrorResponse(error)
     }
  )
}
// get processList
getProcessList() {
  this.restAPIService.getProcessList().subscribe(
    (data: any) => {      
      this.processStep=data;
      this.utilityService.setProcessList(data);
    },error=>{
      this.restAPIService.setApiErrorResponse(error)
     }
  )
}
// get machineList
getMachineList() {
  this.restAPIService.getMachineList().subscribe(
    (data: any) => {
      this.machineStep=data;
      this.utilityService.setMachineList(data);
    },error=>{
      this.restAPIService.setApiErrorResponse(error)
     }
  )
} 
//api calls end  

}
