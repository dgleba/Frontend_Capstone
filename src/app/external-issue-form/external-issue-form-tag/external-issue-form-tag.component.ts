import { Component, OnInit } from '@angular/core';
import {RestAPIService} from 'src/app/Service/restAPIService/rest-apiservice.service'
import {UtilityServiceService} from 'src/app/Service/utility-service.service'
import {Partnumber} from 'src/app/Model/partnumber'
import {Customer} from 'src/app/Model/customer'
import {Reason} from 'src/app/Model/reason';
import { Router } from '@angular/router';
import {QualityTagData} from 'src/app/Model/qualtiyTagData';

@Component({
  selector: 'app-external-issue-form-tag',
  templateUrl: './external-issue-form-tag.component.html',
  styleUrls: ['./external-issue-form-tag.component.css']
})
export class ExternalIssueFormTagComponent implements OnInit {

  constructor(private restAPIService: RestAPIService, private utilityService:UtilityServiceService,private router: Router ) { }  
  public externalTagData:QualityTagData;
  private partNumberList : Partnumber[]; 
  public reasonList : Reason[]; 
  public customerList : Customer[];
  private partNumId= 'id';
  private reasonKeyword='Reason';
  private customerKeyword='CustName';  
  

  ngOnInit() {
    this.getPartList();
    this.getCustomerList();
    this.getReasonList();
   this.externalTagData=new QualityTagData();  
   this.externalTagData.ProblemType='EX';  
    console.log("qta in comman", this.utilityService.getTagData()); 
    this.externalTagData.isPictureComponent=false;
    this.utilityService.setTagData(this.externalTagData);
  }
  focusOutFunction($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.externalTagData.Issuedby = val;
    this.utilityService.setTagData(this.externalTagData);
  }
  //event handler to get the selected value of part num
  getSelectedPartNumber(event: any) {
    console.log("select part num", event.id);
    this.externalTagData.PartID = event.id;
    this.utilityService.setTagData(this.externalTagData);
  }
 // clear calls in auto complete
clearMachineData(){
  this.externalTagData.MachineID = '';
}
clearPartData(){
  this.externalTagData.PartID = '';   
}
clearProcessData(){
  this.externalTagData.ProcessStep = '';
}
clearReasonData(){
  this.externalTagData.Reason = '';
}
clearCustomerData(){
  this.externalTagData.CustomerName='';
}
// clear call done
  setNotInPictureTabBoolean(){
    this.externalTagData.isPictureComponent=false;
    console.log("not in picture boolean", this.externalTagData.isPictureComponent);
    this.utilityService.setTagData(this.externalTagData);
  }
    //event handler to get the selected value of reason
  getSelectedReason(event: any) {
    console.log("select reason num", event.Reason);
    this.externalTagData.Reason = event.Reason;
    this.utilityService.setTagData(this.externalTagData);

  }
  //event handler to get the selected value of process step
  getSelectedProcessStep(event: any) {    
    console.log("select process num", event.Department);
    this.externalTagData.ProcessStep = event.Department;
    this.utilityService.setTagData(this.externalTagData);
  }

   //api calls start
getPartList() {    
  this.restAPIService.getPartList().subscribe(
    (data: any) => {
      this.partNumberList=data;
    return this.partNumberList;   
     
     }
  )
}



getReasonList() {    
  this.restAPIService.getReasonList().subscribe(
    (data: any) => {
      this.reasonList=data;
     return this.reasonList;   
     }
  )
}

getCustomerList() {
  this.restAPIService.getCustomerList().subscribe(
    (data: any) => {
      this.customerList=data;
      this.customerList.splice(0, 1); 
      return this.customerList;
    }
  )
}
//api calls end

submitForm() {
  console.log("external tag data",this.externalTagData);
  if (this.externalTagData.PartID) {
    if (this.externalTagData.Reason) {
      if (this.externalTagData.Issuedby) {
        this.externalTagData.Date=this.utilityService.getTodaysDate().toString();
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
  this.restAPIService.createTag(this.externalTagData).subscribe((data: any) => {
    this.restAPIService.setApiSuccessmessage("Tag created successfully");
    if(this.externalTagData.picture1 || this.externalTagData.picture2 || this.externalTagData.document){
      this.uploadImage(data.id);
    }
    this.router.navigate(['/getTag'])
  },error=>{
    this.restAPIService.setApiErrorResponse(error)
   })
}
 // api call to upload image
 uploadImage(id) {
  console.log("id in image upload",id);
  this.restAPIService.uploadImage(this.externalTagData.picture1, this.externalTagData.picture2, this.externalTagData.document, id).subscribe((data: any) => {
    console.log(data);
  },error=>{
    this.restAPIService.setApiErrorResponse(error)
   });
}
}
