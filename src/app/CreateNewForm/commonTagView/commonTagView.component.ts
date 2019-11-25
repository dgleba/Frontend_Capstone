import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from '../../Service/utility-service.service';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';



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
