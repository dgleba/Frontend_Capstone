import { Component, OnInit } from '@angular/core';
import {RestAPIService} from 'src/app/Service/restAPIService/rest-apiservice.service'
import {UtilityServiceService} from 'src/app/Service/utility-service.service'
import {Partnumber} from 'src/app/Model/partnumber'
import {Customer} from 'src/app/Model/customer'
import {Reason} from 'src/app/Model/reason';

@Component({
  selector: 'app-external-issue-form-tag',
  templateUrl: './external-issue-form-tag.component.html',
  styleUrls: ['./external-issue-form-tag.component.css']
})
export class ExternalIssueFormTagComponent implements OnInit {

  constructor(private restAPIService: RestAPIService, private utilityService:UtilityServiceService ) { }
  
  public internalTagData=this.utilityService.getInternalTagData();
  private partNumberList : Partnumber[]; 
  private partNumId= 'id';
  private reasonKeyword='Reason';
  private customerKeyword='CustName';  
  public reasonList : Reason[]; 
  public customerList : Customer[];

  ngOnInit() {
    this.getPartList();
    this.getCustomerList();
    this.getReasonList();
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

focusOutFunction($event) {
  var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
  this.internalTagData.Issuedby = val;
  this.utilityService.setInternalTagData(this.internalTagData);
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

}
