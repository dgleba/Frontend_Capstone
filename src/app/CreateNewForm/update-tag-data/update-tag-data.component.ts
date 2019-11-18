import { Component, OnInit,Input } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { UtilityServiceService } from '../../Service/utility-service.service';
import {Partnumber} from 'src/app/Model/partnumber';
import {Reason} from 'src/app/Model/reason';
import {QualityTagData} from 'src/app/Model/qualtiyTagData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-tag-data',
  templateUrl: './update-tag-data.component.html',
  styleUrls: ['./update-tag-data.component.css']
})
export class UpdateTagDataComponent implements OnInit {
  constructor(private restAPIService: RestAPIService,private route:ActivatedRoute,
  public utilityService: UtilityServiceService,private router: Router) { }
  public editTagId:number;
  public partNumberList: Partnumber[];
  public reasonList : Reason[];
  public qualityTagData:QualityTagData;
  
  partNumId = 'id';
  reasonKeyword='Reason';
  
  ngOnInit() {
    this.editTagId=parseInt(this.route.snapshot.paramMap.get("id"));   
    this.getQualityTagDataById(this.editTagId);
    this.getPartList();
    this.getReasonList();
  }
  focusOutFunction ($event) {
    var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
    this.qualityTagData.Issuedby=val;
   
 }
   // api calls start
   getQualityTagDataById(id:number){
    console.log("by id");
    this.restAPIService.getQualityTagDataById(id).subscribe(
      (data: any) => {
        console.log("by id data",data);  
        this.qualityTagData = data;

       }
    )
   }
   // api to get part list
   getPartList() {    
    this.restAPIService.getPartList().subscribe(
      (data: any) => {
        this.partNumberList = data;    
       
       }
    )
  }
 // api to get reason list
  getReasonList() {    
    this.restAPIService.getReasonList().subscribe(
      (data: any) => {
        this.reasonList = data;    
       }
    )
  }

  //event handler to get the selected value of part num
  getSelectedPartNumber (event: any) {    
    this.qualityTagData.PartID=event.id;    
  }
  //event handler to get the selected value of reason
  getSelectedReason (event: any) {  
   this.qualityTagData.Reason=event.Reason;    
  }
  clearData(){
    this.qualityTagData.PartID = '';
    this.qualityTagData.Reason = '';     
  }
  updateTag() {
    if (this.qualityTagData.PartID) {
      if (this.qualityTagData.Reason) {
        if (this.qualityTagData.Issuedby) {
          //api call
          this.updateTagApiCall();
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

  updateTagApiCall() {
    this.qualityTagData.Date=this.utilityService.getTodaysDate().toDateString();
    console.log(this.qualityTagData,"quality");
    //this.utilityService.setLengthOfChange(this.tagDetails.lengthOfChange);
    this.restAPIService.updateTag(this.qualityTagData,this.editTagId).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/getTag'])
    })

  }
}
