import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import {QualityTagData} from 'src/app/Model/qualtiyTagData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-tag-data',
  templateUrl: './get-tag-data.component.html',
  styleUrls: ['./get-tag-data.component.css']
})
export class GetTagDataComponent implements OnInit {

  constructor( private restAPIService: RestAPIService , private router : Router) { }
  qualityTagDataList:QualityTagData[];
  searchOption : any = [
    {id: '1', searchBy: 'Tag ID', isChecked: false},
    {id: '2', searchBy: 'Part Number', isChecked: false},
    {id: '3', searchBy: 'Date', isChecked: false},
   ];
   selectedSearchOption:string;
   isSelectedOptionDate:boolean;
  ngOnInit() {    
    this.getQualityTagData();
  }

   //event handler to get the selected value of part num
   getSelectedSearchOption(event: any) {
    this.selectedSearchOption = event.target.value;
    if(this.selectedSearchOption==='Date'){
      this.isSelectedOptionDate=true;
    }else{
      this.isSelectedOptionDate=false;
    }
   
  }

  //Api getQualityTagData
  getQualityTagData(){
    this.restAPIService.getAllQualtityTag().subscribe(
      (data: any) => {
        this.qualityTagDataList = data; 
        console.log(this.qualityTagDataList,"from api");   
       
       }
    )
  }
   //Api to update a tag
  updatetag(id:number){
    console.log("its here");
    this.router.navigate(['/updateTag',id]);
  }
}
