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
    { id: '1', searchBy: 'Tag ID', isChecked: false },
    { id: '2', searchBy: 'Part Number', isChecked: false },
    { id: '3', searchBy: 'Date', isChecked: false },
  ];
  selectedSearchOption: string;
  isSelectedOptionDate: boolean;
  searchValue: string;
  ngOnInit() {
    this.getQualityTagData();
  }

  searchTag() {
    console.log("search value", this.searchValue);
    if (!this.searchValue) {
      alert("Enter data to be searched");
    }
    else {
      switch (this.selectedSearchOption) {
        case "TagId":
          this.callSearchByDataApi(this.searchValue,"","");
          break;
        case "Part Number":
            this.callSearchByDataApi("",this.searchValue,"");
          break;
        case "Date":
            this.callSearchByDataApi("","",this.searchValue,);
          break;

      }
    }
  }
  //event handler to get the selected value of part num
  getSelectedSearchOption(event: any) {
    this.selectedSearchOption = event.target.value;
    if (this.selectedSearchOption === 'Date') {
      this.isSelectedOptionDate = true;
    } else {
      this.isSelectedOptionDate = false;
    }

  }
  // Api to get data by searching 
  callSearchByDataApi(tagId,partNo,date){
    this.restAPIService.getDataBySearch(tagId,partNo,date).subscribe(
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
  //Api to update a tag
  updatetag(id: number) {
    console.log("its here");
    this.router.navigate(['/updateTag', id]);
  }
}
