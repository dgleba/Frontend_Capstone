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
  // set background color for selected nav tag
  clickedLink(e) {
    let element = e.srcElement;
    console.log(e)
    for (let i = 0; i < element.parentElement.children.length; i++) {
      if (element.parentElement.children[i].classList.contains('active')) {
        element.parentElement.children[i].classList.remove('active')
      }
    }
    element.classList.add('active');
  }

  //submitForm
  submitForm(){    
    console.log(this.utilityService.getSelectedPartNum(),"in common tag");
  }

}
