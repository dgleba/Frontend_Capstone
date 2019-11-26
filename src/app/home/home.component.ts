/**
 * @ngdoc component
 * @name rfx.component:HomeComponent
 * @element Button and Header
 * @function
 *
 * @description
 * After Login screen this screen should be displayed
 *
 * 
 **/

import { Component, OnInit } from '@angular/core';
import{UtilityServiceService} from '../Service/utility-service.service';

import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;
  constructor(public utilityService:UtilityServiceService,private router: Router) { }

  ngOnInit() {
    
    this.token = localStorage.getItem('token');
    
   
  }
  logout(){
    this.utilityService.deleteToken();
    this.router.navigate(['/login'])
  }

  
}
