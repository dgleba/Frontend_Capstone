import { Component, OnInit } from '@angular/core';
import {RestAPIService} from '../../Service/restAPIService/rest-apiservice.service'
import{UtilityServiceService} from '../../Service/utility-service.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-special-instruction',
  templateUrl: './special-instruction.component.html',
  styleUrls: ['./special-instruction.component.css']
})
export class SpecialInstructionComponent implements OnInit {  
  constructor(public restAPIService: RestAPIService,public utilityService:UtilityServiceService,private router: Router) { }
 
  public internalTagData=this.utilityService.getInternalTagData();
   ngOnInit() {      
    
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
      this.utilityService.setInternalTagData('');   
      this.restAPIService.setApiSuccessmessage("Tag created successfully")
      this.router.navigate(['/getTag'])
    },error=>{
      this.restAPIService.setApiErrorResponse(error)
     })
  }
  
}
