import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-tag',
  templateUrl: './new-tag.component.html',
  styleUrls: ['./new-tag.component.css']
})
export class NewTagComponent implements OnInit {
tag_summary_option : string[] = ["Quality Alert","Hold Tag","TPC Tag","Special Instruction","Mod Written","Quality Alert - IN"];
  constructor() { }

  ngOnInit() {
  }

}
