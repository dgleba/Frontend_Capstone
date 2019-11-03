import { Component, OnInit } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import {ProcessStep} from '../../Model/processStep';
import {MachineStep} from '../../Model/machine';
import { from } from 'rxjs';


@Component({
  selector: 'app-qualityalertin',
  templateUrl: './qualityalertin.component.html',
  styleUrls: ['./qualityalertin.component.css']
})
export class QualityalertinComponent implements OnInit {
  
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
}
