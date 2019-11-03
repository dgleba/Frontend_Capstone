import { Component, OnInit } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import {ProcessStep} from '../../Model/processStep';
import {MachineStep} from '../../Model/machine';

@Component({
  selector: 'app-special-instruction',
  templateUrl: './special-instruction.component.html',
  styleUrls: ['./special-instruction.component.css']
})
export class SpecialInstructionComponent implements OnInit {
  public processStep:ProcessStep[];
  public machineStep:MachineStep[];
  constructor(public restAPIService: RestAPIService) { }

   ngOnInit() { 
     //call processList  
    this.getProcessList();
     //call machineList  
     this.getMachineList();
    
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
}
