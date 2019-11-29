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
import {User} from '../Model/user';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;
  constructor(public utilityService:UtilityServiceService,private router: Router) { }
  public user:User;
  ngOnInit() { 
    this.token = localStorage.getItem('token');   
    this.user=this.utilityService.getUser();
    this.user.isAdmin=false;
    this.utilityService.setUser(this.user);  
    console.log(this.user,"in home");   
   }
  logout(){
    this.utilityService.deleteToken();
    this.router.navigate(['/login'])
  }
  setUserAsAdmin(){
    this.user.isAdmin=true;
    this.utilityService.setUser(this.user);
  }

  
}
