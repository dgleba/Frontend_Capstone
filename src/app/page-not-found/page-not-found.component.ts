/**
 * @ngdoc directive
 * @name Page Not Found Component
 * @description
 * Component for accessing internal pages without log in
 **/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>
      page-not-found!
    </p>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
