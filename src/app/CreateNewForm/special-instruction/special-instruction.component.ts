import { Component, OnInit } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import{UtilityServiceService} from '../../Service/utility-service.service'
import {QualityTagData} from '../../Model/qualtiyTagData';
import {MachineStep} from '../../Model/machine';

@Component({
  selector: 'app-special-instruction',
  templateUrl: './special-instruction.component.html',
  styleUrls: ['./special-instruction.component.css']
})
export class SpecialInstructionComponent implements OnInit {
  
  constructor(public restAPIService: RestAPIService,public utilityService:UtilityServiceService) { }
  public processStep=this.utilityService.getProcessList();
  public machineStep=this.utilityService.getMachineList();
  public qualityData=this.utilityService.getInternalTagData();
   ngOnInit() { 
     
    
  } 
  
}
