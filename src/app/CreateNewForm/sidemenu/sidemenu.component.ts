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
  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     },
     {
      id: 3,
      name: 'Enter'
    },
    {
      id: 2,
      name: 'Entiy'
    },
    {
     id: 3,
     name: 'Entesss'
   }
  ];
  tagSummaryList = this.utilityService.getTagsummaryList();
  public partNumberList=this.utilityService.getPartNumberList();
  public reasonList=this.utilityService.getReasonList();
  public processStep=this.utilityService.getProcessList();
  public machineStep=this.utilityService.getMachineList();
  public selectedPartNum: string = '';
  public selectedReason: string = '';
  public processStepId: string;
  public machineStepId: string;
  ngOnInit() {
   
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

  



}
