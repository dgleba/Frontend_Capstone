import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';
import {ExternalTagData} from '../../../Model/externalTagData';
import {ProcessStep} from 'src/app/Model/processStep';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { Router } from '@angular/router';
import {MachineStep} from 'src/app/Model/machine';

@Component({
  selector: 'app-special-instruction-external',
  templateUrl: './special-instruction-external.component.html',
  styleUrls: ['./special-instruction-external.component.css']
})
export class SpecialInstructionExternalComponent implements OnInit { 
  public externalTagData;
  partNumId = 'id';
  processKeyword='Department';
  machineKeyword1='MachineDesc';
  public processStep:ProcessStep[];
  public machineStep:MachineStep[];
  public processStepId: string;
  public machineStepId: string;

constructor(private utilityService:UtilityServiceService , 
            private restAPIService: RestAPIService,
            private router: Router) { }
ngOnInit() {
   this.externalTagData = this.utilityService.getExternalTagData();
  this.getProcessList();
  this.getMachineList();
}
// moved to login screen
moveToLoginScreen(){
this.router.navigate(['/login']);
}

focusOutFunction($event) {
var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
this.externalTagData.textIssuedBy = val;
this.utilityService.setExternalTagData(this.externalTagData);
}

//event handler to get the selected value of process step
getSelectedProcessStep(event) {    
  this.externalTagData.ProcessStep = event.Department;
  console.log("Special Ext");
  this.utilityService.setExternalTagData(this.externalTagData);
}

//event handler to get the selected value of machine step
getSelectedMachine(event: any) {
  this.externalTagData.MachineID = event.id;
  this.utilityService.setInternalTagData(this.externalTagData);
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


// clear calls in auto complete
clearProcessData(){
this.externalTagData.ProcessStep = '';
}


clearMachineData(){
  this.externalTagData.MachineID = '';
}


}
