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
 constructor(public restAPIService: RestAPIService, public utilityService: UtilityServiceService, private router: Router) { }
  expiredOn: Date;
  public internalTagData=this.utilityService.getInternalTagData();
  ngOnInit() {
    console.log("inter part",this.internalTagData);
  }
  addDays() {
    this.expiredOn = new Date();
    this.expiredOn.setDate(this.expiredOn.getDate() + parseInt(this.internalTagData.Lengthofchange.toString()));
    console.log(this.expiredOn);
  }  
  //validation 
  submitForm() {
    console.log(this.internalTagData,"okdby malti");
    if (this.internalTagData.PartID) {
      if (this.internalTagData.Reason) {
        if (this.internalTagData.Issuedby) {
          this.internalTagData.Date=this.utilityService.getTodaysDate().toString();
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
    //this.utilityService.setLengthOfChange(this.tagDetails.lengthOfChange);
    this.restAPIService.createTag(this.internalTagData).subscribe((data: any) => {
    
      console.log(data);
      this.router.navigate(['/getTag'])
    })
  }

}
