/**
 * @ngdoc directive
 * @name Side Menu  Component
 * @element Input labels, Drop Downs, Check boxes
 * @function 
 * Preview pictures and document,
 * Check if image is set,
 * Get Documents from the html,
 * Validate MIME type.
 * @description
 * Side Menu component shows Mandtory drops downs with Auto complete, input labels
 * 
 * -------Functions-----------
 * Focus Out , Get Selected Part Number, Get Selected Reason,Get Selected Process Step,
 * Get Selected Id, Set Internal Tag Summary Boolean, 
 * Api call for  PartList,ReasonList,ProcessList,MachineList,
 * Clear Data
 **/
import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import {QualityTagData} from '../../Model/qualtiyTagData';
import {Partnumber} from '../../Model/partnumber';
import {Reason} from '../../Model/reason';
import {ProcessStep} from '../../Model/processStep';
import {MachineStep} from '../../Model/machine';
import { from } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  constructor(private utilityService: UtilityServiceService, private restAPIService: RestAPIService,private router: Router) {
  }
  partNumId = 'id';
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
    this.internalTagData=this.utilityService.getTagData(); 
    this.getPartList();
    this.getReasonList();
    this.getProcessList();
    this.getMachineList();    
  }
  focusOutFunction($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.internalTagData.Issuedby = val;
    this.utilityService.setTagData(this.internalTagData);
  }
  //event handler to get the selected value of part num
  getSelectedPartNumber(event) {
    this.internalTagData.PartID=event.id;
    this.utilityService.setTagData(this.internalTagData);
  }  
  
    //event handler to get the selected value of reason
  getSelectedReason(event) {
    this.internalTagData.Reason = event.Reason;
    this.utilityService.setTagData(this.internalTagData);
  }
 
  //event handler to get the selected value of process step
  getSelectedProcessStep(event) {    
    this.internalTagData.ProcessStep = event.Department;
    this.utilityService.setTagData(this.internalTagData);
  }
  //event handler to get the selected value of machine step
  getSelectedMachine(event: any) {
    this.internalTagData.MachineID = event.id;
    this.utilityService.setTagData(this.internalTagData);
  }
  //get selected tag summary
  getSelectedTag(id: number) {
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
    this.utilityService.setTagData(this.internalTagData);
    console.log("internal tag data",this.utilityService.getTagData());
  }
 //api calls start
getPartList() {    
  this.restAPIService.getPartList().subscribe(
    (data: any) => {     
      this.partNumberList=data;
      this.utilityService.setPartNumberList(this.partNumberList); 
     },error=>{
       if(error.status==401){
        console.log("error in side menu",error.error.error);
        var errorMessage=error.error.error;     
        this.restAPIService.setApiErrorResponse(errorMessage);
        this. moveToLoginScreen();
       }       
     }
  )
}
// moved to login screen
moveToLoginScreen(){
  this.router.navigate(['/login']);
}
// on change part number in auto complete
onChangePartNumber(val: string) {
  console.log("on change search ", val);
  this.restAPIService.getPartListByContains(val).subscribe((data: any) => {
      this.partNumberList=data; 
     },error=>{
      if(error.status==401){
        console.log("error in side menu",error.error.error);
        var errorMessage=error.error.error;     
        this.restAPIService.setApiErrorResponse(errorMessage);
        this. moveToLoginScreen();
       }   
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
      if(error.status==401){
        console.log("error in side menu",error.error.error);
        var errorMessage=error.error.error;     
        this.restAPIService.setApiErrorResponse(errorMessage);
        this. moveToLoginScreen();
       }   
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
      if(error.status==401){
        console.log("error in side menu",error.error.error);
        var errorMessage=error.error.error;     
        this.restAPIService.setApiErrorResponse(errorMessage);
        this. moveToLoginScreen();
       }   
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
      if(error.status==401){
        console.log("error in side menu",error.error.error);
        var errorMessage=error.error.error;     
        this.restAPIService.setApiErrorResponse(errorMessage);
        this. moveToLoginScreen();
       }   
     }
  )
} 
//api calls end 

// clear calls in auto complete
clearMachineData(){
  this.internalTagData.MachineID = '';
}
clearPartData(){
  this.internalTagData.PartID = '';   
}
clearProcessData(){
  this.internalTagData.ProcessStep = '';
}
clearReasonData(){
  this.internalTagData.Reason = '';
}
// clear call done
}
