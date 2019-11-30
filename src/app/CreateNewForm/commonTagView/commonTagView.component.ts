import { Component, OnInit,OnDestroy  } from '@angular/core';
import { UtilityServiceService } from '../../Service/utility-service.service';
import { QualityTagData } from 'src/app/Model/qualtiyTagData';



@Component({
  selector: 'app-commontagview',
  templateUrl: './commonTagView.component.html',
  styleUrls: ['./commonTagView.component.css']
})
export class CommonTagView implements OnInit,OnDestroy  {
  ngOnDestroy(): void {
    this.utilityService.setTagData('');
  }
  constructor(public utilityService: UtilityServiceService) { }
  
  ngOnInit() {
    var  qtagData=new QualityTagData();
    qtagData.ProblemType='IN';
    this.utilityService.setTagData(qtagData);
    console.log("qta in comman", this.utilityService.getTagData()); 
  }
  

}
