import { Component, OnInit } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import {ProcessStep} from '../../Model/processStep';
import {MachineStep} from '../../Model/machine';


@Component({
  selector: 'app-holdtag',
  templateUrl: './holdtag.component.html',
  styleUrls: ['./holdtag.component.css']
})
export class HoldtagComponent implements OnInit {
  expiredOn : Date ;
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
