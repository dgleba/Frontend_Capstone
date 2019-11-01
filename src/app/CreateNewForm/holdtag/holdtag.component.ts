import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';


@Component({
  selector: 'app-holdtag',
  templateUrl: './holdtag.component.html',
  styleUrls: ['./holdtag.component.css']
})
export class HoldtagComponent implements OnInit {

  constructor(private utilityService : UtilityServiceService) { }

  ngOnInit() {
  }
  checkValue(event: any){
    console.log(event);  
      this.utilityService.tagSummaryOption[1].isChecked = event;
    }
 
}
