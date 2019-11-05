import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import {QualityTagData} from 'src/app/Model/qualtiyTagData';

@Component({
  selector: 'app-get-tag-data',
  templateUrl: './get-tag-data.component.html',
  styleUrls: ['./get-tag-data.component.css']
})
export class GetTagDataComponent implements OnInit {

  constructor( private restAPIService: RestAPIService) { }
  qualityTagDataList:QualityTagData[];
  ngOnInit() {
    
    this.getQualityTagData();
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
}
