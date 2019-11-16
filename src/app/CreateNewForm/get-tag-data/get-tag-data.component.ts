import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-tag-data',
  templateUrl: './get-tag-data.component.html',
  styleUrls: ['./get-tag-data.component.css']
})
export class GetTagDataComponent implements OnInit {

  constructor(private restAPIService: RestAPIService, private router: Router) { }
  qualityTagDataList: QualityTagData[];
  searchOption: any = [
    { id: '1', searchBy: 'Tag ID', isChecked: false ,value:''},
    { id: '2', searchBy: 'Part Number', isChecked: false ,value:'' },
    { id: '3', searchBy: 'Text has', isChecked: false ,value:'' },
    { id: '4', searchBy: 'Date', isChecked: false ,value:'' },
  ];
  
  ngOnInit() {
    this.getQualityTagData();
  }

  searchTag() {
    console.log("search value", this.searchOption);
    this.callSearchByDataApi();
   
  }
  
  // Api to get data by searching 
  callSearchByDataApi(){
    this.restAPIService.getDataBySearch(this.searchOption).subscribe(
      (data: any) => {
        this.qualityTagDataList = data;
        if(this.qualityTagDataList.length!=0){
          console.log(this.qualityTagDataList, "from api");
        }else{
          alert("No data available");
          this.getQualityTagData();
        }      

      }
    )

  }
  //Api getQualityTagData
  getQualityTagData() {
    this.restAPIService.getAllQualtityTag().subscribe(
      (data: any) => {
        this.qualityTagDataList = data;
        console.log(this.qualityTagDataList, "from api");

      }
    )
  }
  //go to update page with id
  updatetag(id: number) {
    console.log("its here");
    this.router.navigate(['/updateTag', id]);
  }
}
