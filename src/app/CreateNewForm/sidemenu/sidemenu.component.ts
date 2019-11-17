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
  public internalTagData=this.utilityService.getInternalTagData();
  public partNumberList:Partnumber[];
  public reasonList:Reason[];
  public processStep:ProcessStep[];
  public machineStep:MachineStep[];
  public selectedPartNum: string = '';
  public selectedReason: string = '';
  public processStepId: string;
  public machineStepId: string;
  ngOnInit() {
   
    console.log("inter part",this.internalTagData);
    this.getMachineList();
    this.getPartList();
    this.getProcessList();
    this.getReasonList();

  }
  focusOutFunction($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.internalTagData.Issuedby = val;
    this.utilityService.setInternalTagData(this.internalTagData);

  }

  //event handler to get the selected value of part num
  getSelectedPartNumber(event: any) {
    this.selectedPartNum=event.target.value;
    this.internalTagData.PartID = this.selectedPartNum;
    this.utilityService.setInternalTagData(this.internalTagData);

  }
  getSelectedReason(event: any) {
     this.selectedReason = event.target.value;
    this.internalTagData.Reason = event.target.value;
    this.utilityService.setInternalTagData(this.internalTagData);

  }
  //event handler to get the selected value of part num
  getSelectedProcessStep(event: any) {
    this.processStepId = event.target.value;

  }
  getSelectedMachine(event: any) {
    this.internalTagData.MachineID = event.target.value;
    this.utilityService.setInternalTagData(this.internalTagData);
  }
  //
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
    this.utilityService.setInternalTagData(this.internalTagData);
    console.log("internal tag data",this.utilityService.getInternalTagData());
  }

  //api calls start
getPartList() {    
  this.restAPIService.getPartList().subscribe(
    (data: any) => {
      this.partNumberList=data;
      this.utilityService.setPartNumberList(data);    
     
     }
  )
}

getReasonList() {    
  this.restAPIService.getReasonList().subscribe(
    (data: any) => {
      this.reasonList=data;
      this.utilityService.setReasonList(data);    
     }
  )
}
// get processList
getProcessList() {
  this.restAPIService.getProcessList().subscribe(
    (data: any) => {
      this.processStep=data;
      this.utilityService.setProcessList(data);
    }
  )
}
// get machineList
getMachineList() {
  this.restAPIService.getMachineList().subscribe(
    (data: any) => {
      this.machineStep=data;
      this.utilityService.setMachineList(data);
    }
  )
} 
//api calls end

  

}
