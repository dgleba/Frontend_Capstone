import { Component } from '@angular/core';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public utilityService: UtilityServiceService) {}
    apiData=this.utilityService.getApiResponse();
}
