import { Component,OnInit,Input } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import {UtilityServiceService} from '../../Service/utility-service.service'
import {ProcessStep} from '../../Model/processStep';
import {MachineStep} from '../../Model/machine';
import { Router} from '@angular/router';



@Component({
  selector: 'app-qualityalertin',
  templateUrl: './qualityalertin.component.html',
  styleUrls: ['./qualityalertin.component.css']
})
export class QualityalertinComponent implements OnInit {
  @Input() tagDetails = {Date:'2019-11-06 22:55:59',PartID:'',
  okdBy:'',body:'',Issuedby:'TB'}
  expiredOn : Date ;
  public processStep:ProcessStep[];
  public machineStep:MachineStep[];
  public processStepId:string;
  public machineStepId:string;
  public qualityAlertInDays:number;
  constructor(public restAPIService: RestAPIService,
    public utilityService:UtilityServiceService,private router: Router) {}

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
  submitForm() {
    console.log(this.tagDetails);
    this.tagDetails.PartID=this.utilityService.getSelectedPartNum();
    console.log(this.utilityService.getSelectedPartNum());
    console.log(this.tagDetails);
    this.utilityService.setOkdBy(this.tagDetails.okdBy);
    this.utilityService.setBody(this.tagDetails.body);
    this.utilityService.setLengthOfChange(this.tagDetails.lengthOfChange);
    this.restAPIService.createTag(this.tagDetails).subscribe((data:any) => {
        console.log(data);       
        this.router.navigate(['/home'])
    })

    
  }
}
