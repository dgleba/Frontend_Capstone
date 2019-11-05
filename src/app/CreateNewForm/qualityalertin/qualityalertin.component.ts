import { Component,OnInit,Input } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import {UtilityServiceService} from '../../Service/utility-service.service'
import {ProcessStep} from '../../Model/processStep';
import {MachineStep} from '../../Model/machine';




@Component({
  selector: 'app-qualityalertin',
  templateUrl: './qualityalertin.component.html',
  styleUrls: ['./qualityalertin.component.css']
})
export class QualityalertinComponent implements OnInit {
  @Input() tagDetails = {
  okdBy:'',body:'',lengthOfChange:''}
  expiredOn : Date ;
  public processStep:ProcessStep[];
  public machineStep:MachineStep[];
  public processStepId:string;
  public machineStepId:string;
  constructor(public restAPIService: RestAPIService,public utilityService:UtilityServiceService) {}

   ngOnInit() {     
     //call processList  
    this.getProcessList();
     //call machineList  
     this.getMachineList();    
  } 
  addDays(qualityAlertInDays){
    console.log("Hello");
    this.expiredOn = new Date();
   this.expiredOn.setDate(this.expiredOn.getDate()+parseInt(qualityAlertInDays)) ;
  console.log(this.expiredOn);
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
  //event handler to get the selected value of part num
  getSelectedProcessStep (event: any) {    
    this.processStepId = event.target.value;
    this.utilityService.setSelectedProcessStep(this.processStepId);    
  }
  getSelectedMachine (event: any) {    
    this.machineStepId = event.target.value;
    this.utilityService.setSelectedMachineStep(this.machineStepId);    
  }
  //testing
  loginUser() {
    console.log(this.tagDetails);
    this.utilityService.setOkdBy(this.tagDetails.okdBy);
    this.utilityService.setBody(this.tagDetails.body);
    this.utilityService.setLengthOfChange(this.tagDetails.lengthOfChange);

    
  }
}
