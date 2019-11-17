import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from '../../Service/utility-service.service';



@Component({
  selector: 'app-commontagview',
  templateUrl: './commonTagView.component.html',
  styleUrls: ['./commonTagView.component.css']
})
export class CommonTagView implements OnInit {
  constructor(public utilityService: UtilityServiceService) { }
  
  ngOnInit() {
  
  }
  

}
