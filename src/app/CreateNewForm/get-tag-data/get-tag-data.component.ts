import { Component, OnInit } from '@angular/core';
import { RestAPIService } from '../../Service/restAPIService/rest-apiservice.service';
import {UtilityServiceService} from '../../Service/utility-service.service';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';
import {User} from 'src/app/Model/user';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-get-tag-data',
  templateUrl: './get-tag-data.component.html',
  styleUrls: ['./get-tag-data.component.css']
})
export class GetTagDataComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,private restAPIService: RestAPIService, private utilityService:UtilityServiceService, private router: Router) { }
  qualityTagDataList: QualityTagData[];
  isAdmin:boolean;
  searchOption: any = [
    { id: '1', searchBy: 'Tag ID', isChecked: false ,value:''},
    { id: '2', searchBy: 'Part Number', isChecked: false ,value:'' },
    { id: '3', searchBy: 'Date', isChecked: false ,value:'' },
    { id: '4', searchBy: 'Text Has', isChecked: false ,value:'' },
  ];
  
  ngOnInit() {
    this.getQualityTagData();
    console.log(this.utilityService.getIsAdmin(),"in get"); 
      this.isAdmin=this.utilityService.getIsAdmin();
      console.log(this.isAdmin,"is admin "); 
  }

  searchTag() {
    this.callSearchByDataApi();   
  }
  
  // Api to get data by searching 
  callSearchByDataApi(){
    this.spinner.show();
    this.restAPIService.getDataBySearch(this.searchOption).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.qualityTagDataList = data;
        if(this.qualityTagDataList.length!=0){
        }else{
         this.restAPIService.setApiErrorResponse("No Data Available")
          this.getQualityTagData();
        } 

      },error=>{
        this.spinner.hide();
        if(error.status==401){
          console.log("error in side menu",error.error.error);
          var errorMessage=error.error.error;                 
          this.restAPIService.setApiErrorResponse(errorMessage)                
         }else{
          this.restAPIService.setApiErrorResponse(error.message)
         }
       }
    )

  }
  //Api getQualityTagData
  getQualityTagData() {
    this.spinner.show();
    this.restAPIService.getAllQualtityTag().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.qualityTagDataList = data;
        },error=>{
          this.spinner.hide();
          console.log("error", error);
          if(error.status==401){
            console.log("error in side menu",error.error.error);
            var errorMessage=error.error.error;                 
            this.restAPIService.setApiErrorResponse(errorMessage)                
           }else{
            this.restAPIService.setApiErrorResponse(error.message)
           }
         }
    )
  }
  //go to update page with id
  updatetag(id: number) {
    this.router.navigate(['/updateTag', id]);
  }
  // delete the tag
  deleteTag(id){
    this.spinner.show()
    this.restAPIService.deleteTag(id).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.getQualityTagData();
        this.restAPIService.setApiSuccessmessage("Tag deleted successfully");
        },error=>{
          this.spinner.hide();
          if(error.status==401){
            console.log("error in side menu",error.error.error);
            var errorMessage=error.error.error;                 
            this.restAPIService.setApiErrorResponse(errorMessage)                
           }else{
            this.restAPIService.setApiErrorResponse(error.message)
           }
         }
    )
  }
}
