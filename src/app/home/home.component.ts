import { Component, OnInit } from '@angular/core';
import{UtilityServiceService} from '../Service/utility-service.service';
import{RestAPIService} from '../Service/restAPIService/rest-apiservice.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;
  constructor(public utilityService:UtilityServiceService,public restAPIService:RestAPIService,private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getPartList();
    this.getMachineList();
    this.getProcessList();
    this.getReasonList();
   
  }
  logout(){
    this.utilityService.deleteToken();
    this.router.navigate(['/login'])
  }

  //api calls start
  getPartList() {    
    this.restAPIService.getPartList().subscribe(
      (data: any) => {
        this.utilityService.setPartNumberList(data);    
       
       }
    )
  }

  getReasonList() {    
    this.restAPIService.getReasonList().subscribe(
      (data: any) => {
        this.utilityService.setReasonList(data);    
       }
    )
  }
  // get processList
  getProcessList() {
    this.restAPIService.getProcessList().subscribe(
      (data: any) => {
        this.utilityService.setProcessList(data);
      }
    )
  }
  // get machineList
  getMachineList() {
    this.restAPIService.getMachineList().subscribe(
      (data: any) => {
        this.utilityService.setMachineList(data);
      }
    )
  } 
  //api calls end
}
