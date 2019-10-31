import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  
constructor(private utilityService : UtilityServiceService ) {
 }


 tagSummaryList = this.utilityService.getTagsummaryList();

ngOnInit() {

  console.log(this.tagSummaryList)

  }


}
