import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holdtag',
  templateUrl: './holdtag.component.html',
  styleUrls: ['./holdtag.component.css']
})
export class HoldtagComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  checkValue(event: any){
    console.log(event);
 }

}
