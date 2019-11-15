import { Component, OnInit, Input } from '@angular/core';
import { RestAPIService } from '../../Service/restAPIService/rest-apiservice.service'
import { UtilityServiceService } from '../../Service/utility-service.service'

import { Router } from '@angular/router';



@Component({
  selector: 'app-qualityalertin',
  templateUrl: './qualityalertin.component.html',
  styleUrls: ['./qualityalertin.component.css']
})
export class QualityalertinComponent implements OnInit {
  @Input() tagDetails = {
    Date: '', PartID: '', Reason:'',
    Okdby: '', body: '', Issuedby: '', Lengthofchange:''
  }
  expiredOn: Date;
  
 
  constructor(public restAPIService: RestAPIService,
    public utilityService: UtilityServiceService, private router: Router) { }

  ngOnInit() {
  
  }
  addDays() {
    this.expiredOn = new Date();
    this.expiredOn.setDate(this.expiredOn.getDate() + parseInt(this.tagDetails.Lengthofchange));
    console.log(this.expiredOn);
  }

  
  //validation 
  submitForm() {
    console.log(this.tagDetails.Okdby,"okdby malti");
    // console.log(this.utilityService.getSelectedPartNum(),"in quality");
    // if (this.utilityService.getSelectedPartNum()) {
    //   if (this.utilityService.getSelectedReason()) {
    //     if (this.utilityService.getIssuedBy()) {
    //       //api call
    //       this.createTagApiCall();
    //     } else {
    //       alert("Enter Issued by");
    //     }
    //   } else {
    //     alert("Select Reason");
    //   }
    // } else {
    //   alert("Select Part Number");
    // }
  }

  createTagApiCall() {
    this.tagDetails.Date=this.utilityService.getTodaysDate().toDateString();
    this.tagDetails.Issuedby = this.utilityService.getIssuedBy();
    this.tagDetails.PartID = this.utilityService.getSelectedPartNum();
    this.tagDetails.Reason=this.utilityService.getSelectedReason();   
    this.utilityService.setOkdBy(this.tagDetails.Okdby);
    this.utilityService.setBody(this.tagDetails.body);
    console.log(this.tagDetails);
    //this.utilityService.setLengthOfChange(this.tagDetails.lengthOfChange);
    this.restAPIService.createTag(this.tagDetails).subscribe((data: any) => {
      console.log(data);
      this.utilityService.clearData();
      this.router.navigate(['/getTag'])
    })

  }

}
