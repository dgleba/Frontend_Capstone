import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import {Partnumber} from 'src/app/Model/partnumber';
import {Reason} from 'src/app/Model/reason';
import { ProcessStep } from '../../Model/processStep';
import { MachineStep } from '../../Model/machine';

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
  public processStep: ProcessStep[];
  public machineStep: MachineStep[];
  public selectedPartNum: string = '';
  public selectedReason: string = '';
  public processStepId: string;
  public machineStepId: string;
  ngOnInit() {
    this.getPartList();
    this.getReasonList();
     //call processList  
     this.getProcessList();
     //call machineList  
     this.getMachineList();
   
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
   //event handler to get the selected value of part num
   getSelectedProcessStep(event: any) {
    this.processStepId = event.target.value;
    this.utilityService.setSelectedProcessStep(this.processStepId);
  }
  getSelectedMachine(event: any) {
    this.machineStepId = event.target.value;
    this.utilityService.setSelectedMachineStep(this.machineStepId);
  }
  //
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
  // get processList
  getProcessList() {
    this.restAPIService.getProcessList().subscribe(
      (data: any) => {
        this.processStep = data;
      }
    )
  }
  // get machineList
  getMachineList() {
    this.restAPIService.getMachineList().subscribe(
      (data: any) => {
        this.machineStep = data;
      }
    )
  }
 
  //api calls end



}
