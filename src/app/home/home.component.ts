/**
 * @ngdoc directive
 * @name Home Component
 * @description
 * Home Component shows the main dashboard
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
  public user=new User;
  ngOnInit() { 
    this.token = localStorage.getItem('token');   
   }
  logout(){
    this.utilityService.deleteToken();
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/login'])
  }
  setUserAsAdmin(){
    this.utilityService.setIsAdmin(true);
  }

  removeUserAAdmin(){
    this.utilityService.setIsAdmin(false);
  }
  
}
