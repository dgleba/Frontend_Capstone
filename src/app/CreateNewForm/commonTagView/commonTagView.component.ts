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
  

  
  //submitForm
  submitForm(){ 
    if(this.utilityService.getSelectedPartNum()!=undefined){
      if(this.utilityService.getSelectedReason()!=undefined){ 
            
      } else{
        alert("Select Reason");
      }
    } else{
      alert("Select Part Number");
    }
    console.log(this.utilityService.getSelectedPartNum(),"in common tag");
  }

}
