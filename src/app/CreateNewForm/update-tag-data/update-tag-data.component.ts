/**
 * @ngdoc directive
 * @name Update Tag Component
 * @element Input labels, Text Areas
 * @function 
 * Preview pictures and document,
 * Check if image is set,
 * Get Documents from the html,
 * Validate MIME type.
 * @description
 * Update Tag component shows input labels , text areas for updating the internal tag.
 * 
 * -------Functions-----------
 * Get Quality Tag By Id,
 * API call for getting Part Number List, Reason List, Machine List,
 * API call for updating the tag
 **/
import { Component, OnInit,Input } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { UtilityServiceService } from '../../Service/utility-service.service';
import {Partnumber} from 'src/app/Model/partnumber';
import {Reason} from 'src/app/Model/reason';
import {QualityTagData} from 'src/app/Model/qualtiyTagData';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-tag-data',
  templateUrl: './update-tag-data.component.html',
  styleUrls: ['./update-tag-data.component.css']
})
export class UpdateTagDataComponent implements OnInit {
  constructor(private datePipe: DatePipe,private restAPIService: RestAPIService,private route:ActivatedRoute,
  public utilityService: UtilityServiceService,private router: Router) { }
  apiData=this.utilityService.getApiResponse();
  public editTagId:number;
  public partNumberList: Partnumber[];
  public reasonList : Reason[];
  public qualityTagData=this.utilityService.getTagData();  
  partNumId = 'id';
  reasonKeyword='Reason';
  
  ngOnInit() {
    this.editTagId=parseInt(this.route.snapshot.paramMap.get("id"));   
    this.getQualityTagDataById(this.editTagId);
    this.getPartList();
    this.getReasonList();
    this.apiData.isApiCalled=false;
    this.utilityService.setApiResponse(this.apiData); 
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
        this.qualityTagData = data;
       },error=>{
        this.restAPIService.setApiErrorResponse(error)
       }
    )
   }
   // api to get part list
   getPartList() {    
    this.restAPIService.getPartList().subscribe(
      (data: any) => {
        this.partNumberList = data; 
       },error=>{
        this.restAPIService.setApiErrorResponse(error)
       }
    )
  }
 // api to get reason list
  getReasonList() {    
    this.restAPIService.getReasonList().subscribe(
      (data: any) => {
        this.reasonList = data;    
       },error=>{
        this.restAPIService.setApiErrorResponse(error)
       }
    )
  }

  //event handler to get the selected value of part num
  getSelectedPartNumber (event) {    
    this.qualityTagData.PartID=event.target.value;    
  }
  //event handler to get the selected value of reason
  getSelectedReason (event) {  
   this.qualityTagData.Reason=event.target.value;    
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
    var dateTime = this.datePipe.transform(new Date(),"yyyy-MM-dd HH:mm:ss");
    this.qualityTagData.Date = dateTime;
    console.log(this.qualityTagData,"quality");
    //this.utilityService.setLengthOfChange(this.tagDetails.lengthOfChange);
    this.restAPIService.updateTag(this.qualityTagData,this.editTagId).subscribe((data: any) => {
      this.restAPIService.setApiSuccessmessage("Tag updated successfully");
      this.router.navigate(['/getTag'])
    },error=>{
      this.restAPIService.setApiErrorResponse(error)
     });
  }
}

