import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/Service/utility-service.service';

@Component({
  selector: 'app-side-menu-external',
  templateUrl: './side-menu-external.component.html',
  styleUrls: ['./side-menu-external.component.css']
})
export class SideMenuExternalComponent implements OnInit {

  constructor(private utilityService: UtilityServiceService) { }
  tagSummaryList = this.utilityService.getTagsummaryList();
  ngOnInit() {
  }

}
