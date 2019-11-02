import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  
constructor(private utilityService : UtilityServiceService , private restAPIService : RestAPIService) {
 }
tagSummaryList = this.utilityService.getTagsummaryList();

ngOnInit() {
console.log(this.tagSummaryList)
this.getPartList();
  }
getPartList(){
this.restAPIService.getPartList().subscribe(
  (data:any)=> {}
)
}

}
