import { Component, OnInit, Input } from '@angular/core';
import { RestAPIService } from '../../Service/restAPIService/rest-apiservice.service'
import { UtilityServiceService } from '../../Service/utility-service.service'
import { ProcessStep } from '../../Model/processStep';
import { MachineStep } from '../../Model/machine';
import { Router } from '@angular/router';



@Component({
  selector: 'app-qualityalertin',
  templateUrl: './qualityalertin.component.html',
  styleUrls: ['./qualityalertin.component.css']
})
export class QualityalertinComponent implements OnInit {
  @Input() tagDetails = {
    Date: '', PartID: '',
    okdBy: '', body: '', Issuedby: '', Lengthofchange:''
  }
  expiredOn: Date;
  public processStep: ProcessStep[];
  public machineStep: MachineStep[];
  public processStepId: string;
  public machineStepId: string;
  constructor(public restAPIService: RestAPIService,
    public utilityService: UtilityServiceService, private router: Router) { }

  ngOnInit() {
    //call processList  
    this.getProcessList();
    //call machineList  
    this.getMachineList();
  }
  addDays() {
    this.expiredOn = new Date();
    this.expiredOn.setDate(this.expiredOn.getDate() + parseInt(this.tagDetails.Lengthofchange));
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
  getSelectedProcessStep(event: any) {
    this.processStepId = event.target.value;
    this.utilityService.setSelectedProcessStep(this.processStepId);
  }
  getSelectedMachine(event: any) {
    this.machineStepId = event.target.value;
    this.utilityService.setSelectedMachineStep(this.machineStepId);
  }
  //validation 
  submitForm() {
    console.log(this.utilityService.getSelectedPartNum(),"in quality");
    if (this.utilityService.getSelectedPartNum()) {
      if (this.utilityService.getSelectedReason()) {
        if (this.utilityService.getIssuedBy()) {
          //api call
          this.createTagApiCall();
        } else {
          alert("Enter Issued by");
        }
      } else {
        alert("Select Reason");
      }
    } else {
      alert("Select Part Number");
    }
  }

  createTagApiCall() {
    this.tagDetails.Date=this.utilityService.getTodaysDate().toDateString();
    this.tagDetails.Issuedby = this.utilityService.getIssuedBy();
    this.tagDetails.PartID = this.utilityService.getSelectedPartNum();
    console.log(this.tagDetails);
    this.utilityService.setOkdBy(this.tagDetails.okdBy);
    this.utilityService.setBody(this.tagDetails.body);
    //this.utilityService.setLengthOfChange(this.tagDetails.lengthOfChange);
    this.restAPIService.createTag(this.tagDetails).subscribe((data: any) => {
      console.log(data);
      this.utilityService.clearData();
      this.router.navigate(['/getTag'])
    })

  }

}
