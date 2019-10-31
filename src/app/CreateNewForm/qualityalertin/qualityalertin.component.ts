import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qualityalertin',
  templateUrl: './qualityalertin.component.html',
  styleUrls: ['./qualityalertin.component.css']
})
export class QualityalertinComponent implements OnInit {
  
  expiredOn : Date ;
  constructor() { }

  ngOnInit() {
  
  } 
  addDays(qualityAlertInDays){
    console.log("Hello");
    this.expiredOn = new Date();
   this.expiredOn.setDate(this.expiredOn.getDate()+parseInt(qualityAlertInDays)) ;
  console.log(this.expiredOn);
  }
}
