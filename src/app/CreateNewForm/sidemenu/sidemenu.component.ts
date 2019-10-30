import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  tag_summary_option : string[] = ["Quality Alert","Hold Tag","TPC Tag","Special Instruction","Mod Written","Quality Alert - IN"];
  constructor() { }

  ngOnInit() {
  }

}
