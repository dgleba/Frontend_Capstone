import { Component, OnInit } from '@angular/core';
import {RestAPIService} from 'src/app/Service/restAPIService/rest-apiservice.service'
import {UtilityServiceService} from 'src/app/Service/utility-service.service'
import {Partnumber} from 'src/app/Model/partnumber'
import {Customer} from 'src/app/Model/customer'
import {Reason} from 'src/app/Model/reason';
import { Router } from '@angular/router';
import {QualityTagData} from 'src/app/Model/qualtiyTagData';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-external-issue-form-tag',
  templateUrl: './external-issue-form-tag.component.html',
  styleUrls: ['./external-issue-form-tag.component.css']
})
export class ExternalIssueFormTagComponent implements OnInit {

  constructor(private datePipe: DatePipe,private spinner: NgxSpinnerService,private restAPIService: RestAPIService, private utilityService:UtilityServiceService,private router: Router ) { }  
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
    this.externalTagData.isPictureComponent=false;
    this.utilityService.setTagData(this.externalTagData);
    console.log("qta in comman", this.utilityService.getTagData()); 
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
        var dateTime = this.datePipe.transform(new Date(),"yyyy-MM-dd HH:mm:ss");
      this.externalTagData.Date = dateTime;
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
  this.spinner.show();
  this.restAPIService.createTag(this.externalTagData).subscribe((data: any) => {
    this.spinner.hide();
    this.restAPIService.setApiSuccessmessage("Tag created successfully");
    if(this.externalTagData.picture1 || this.externalTagData.picture2 || this.externalTagData.document){
      this.uploadImage(data.id);
    }
    this.router.navigate(['/getTag'])
  },error=>{
    this.spinner.hide();
    if(error.status==401){
      console.log("error in side menu",error.error.error);
      var errorMessage=error.error.error;                 
      this.restAPIService.setApiErrorResponse(errorMessage)                
     }else{
      this.restAPIService.setApiErrorResponse(error.message)
     }
   })
}
 // api call to upload image
 uploadImage(id) {
  console.log("id in image upload",id);
  this.restAPIService.uploadImage(this.externalTagData.picture1, this.externalTagData.picture2, this.externalTagData.document, id).subscribe((data: any) => {
    console.log(data);
  },error=>{
    this.spinner.hide();
    if(error.status==401){
      console.log("error in side menu",error.error.error);
      var errorMessage=error.error.error;                 
      this.restAPIService.setApiErrorResponse(errorMessage)                
     }else{
      this.restAPIService.setApiErrorResponse(error.message)
     }
   });
}
}
