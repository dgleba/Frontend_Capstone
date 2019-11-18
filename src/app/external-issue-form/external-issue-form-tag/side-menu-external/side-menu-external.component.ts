import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';
import {Partnumber} from '../../../Model/partnumber';
import {Reason} from '../../../Model/reason';
import {Customer} from '../../../Model/customer'

@Component({
  selector: 'app-side-menu-external',
  templateUrl: './side-menu-external.component.html',
  styleUrls: ['./side-menu-external.component.css']
})
export class SideMenuExternalComponent implements OnInit {
 

  constructor(private utilityService: UtilityServiceService,private restAPIService: RestAPIService) { }
  partNumId = 'id';
  reasonKeyword='Reason';
  CustomerNameKeyWord="CustName";
 

  tagSummaryList = this.utilityService.getTagsummaryList();
  public internalTagData=this.utilityService.getInternalTagData();
  public partNumberList:Partnumber[];
  public reasonList:Reason[];
  public customerList : Customer[];

  ngOnInit() {
    this.getPartList();
    this.getReasonList();
    this.getCustomerList();
  }
  focusOutFunction($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.internalTagData.Issuedby = val;
    this.utilityService.setInternalTagData(this.internalTagData);

  }

 //event handler to get the selected value of part num
 getSelectedPartNumber(event: any) {
  console.log("select part num", event.id);
  this.internalTagData.PartID = event.id;
  this.utilityService.setInternalTagData(this.internalTagData);
}
clearData(){
  this.internalTagData.PartID = '';
  this.internalTagData.Reason = '';
  this.internalTagData.CustName='';
  console.log("not part num",this.internalTagData.PartID); 
}
  //event handler to get the selected value of reason
getSelectedReason(event: any) {
  console.log("select reason num", event.Reason);
  this.internalTagData.Reason = event.Reason;
  this.utilityService.setInternalTagData(this.internalTagData);

}

//event handler to get the selected value of reason
getSelectedCustomer(event: any) {
  console.log("select customer", event.CustName);
  this.internalTagData.CustName = event.CustName;
  this.utilityService.setInternalTagData(this.internalTagData);

}

   //api calls start
getPartList() {    
  this.restAPIService.getPartList().subscribe(
    (data: any) => {
      this.partNumberList=data;
      this.utilityService.setPartNumberList(data);    
     
     }
  )
}

getCustomerList() {    
  this.restAPIService.getCustomerList().subscribe(
    (data: any) => {
      console.log(data,"Customer");
      this.customerList=data;
      this.utilityService.setCustomerList(data);    
     
     }
  )
}

getReasonList() {    
  this.restAPIService.getReasonList().subscribe(
    (data: any) => {
      this.reasonList=data;
      this.utilityService.setReasonList(data);    
     }
  )
}

}
