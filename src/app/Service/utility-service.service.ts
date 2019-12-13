/**
 * @ngdoc directive
 * @name UtilityService Service
 * @description
 * Service for getting and setting the data from the api calls
 **/
import { Injectable, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {User} from 'src/app/Model/user';
import {QualityTagData} from '../Model/qualtiyTagData';
import {Partnumber} from 'src/app/Model/partnumber';
import {Reason} from 'src/app/Model/reason';
import { ProcessStep } from 'src/app/Model/processStep';
import { MachineStep } from 'src/app/Model/machine';
@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  apiData:any={
    isApiCalled:false,
    isApiResponseSuccessful:true,
    msg : ''
  }
  
tagSummaryOption : any = [
  {id: '1', tagName: 'Quality Alert', isChecked: false},
  {id: '2', tagName: 'Hold Tag', isChecked: false},
  {id: '3', tagName: 'TPC Tag', isChecked: false},
  {id: '4', tagName: 'Special Instruction', isChecked: false},
  {id: '5', tagName: 'Quality Alert - IN', isChecked: false},
  {id: '6', tagName: 'Supplier Issue', isChecked: false}];
  public isAdmin;
  public tagData:QualityTagData;
  public partNumberList: Partnumber[];
  public reasonList : Reason[];
  public processStepList: ProcessStep[];
  public machineStepList: MachineStep[];
  token : string;
  partNum:string;
  reason:string;
  processNum:string;
  machineNum:string;
  lengthOfChange:string;
  quatity:number;
  body:string;
  okdBy:string;
  issuedBy:string;
  expiredOn: Date;
  constructor() { 
    
  } 
  addDays(lengthOfChange) {
    this.expiredOn = new Date();
    this.expiredOn.setDate(this.expiredOn.getDate() + parseInt(lengthOfChange.toString()));
    return this.expiredOn;
  }  
  //getter setter for api Response boolean
 setApiResponse(apiData){
   this.apiData=apiData;
 }
 getApiResponse(){
   return this.apiData;
 }

  getTagsummaryList()
  {
    return this.tagSummaryOption;
  }
  setUpdatedTagSummaryObject(tagSummaryObj:any,id:number){
    this.tagSummaryOption[id]=tagSummaryObj;
   }

  setToken(token:string)
  {
    localStorage.setItem('token',token);
  }

  getToken()
  {
    return this.token = localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
//---------setter getter for models-----///
//getter setter for userMode
    setIsAdmin(isAdmin){
      localStorage.setItem('isAdmin',isAdmin);
    }
    getIsAdmin(){  
      var isAdmin=localStorage.getItem('isAdmin'); 
      this.isAdmin=isAdmin;  
      return this.isAdmin;
    }
  //getter setter for qualityTagData
  setTagData(internalTagObj){
    this.tagData=internalTagObj;
  }
  getTagData(){
    return this.tagData;
  }

//getter setter for part number
  setPartNumberList(partList){
    this.partNumberList=partList;
  }
  getPartNumberList(){
    return this.partNumberList;
  }

  //getter setter for reason
  setReasonList(reasonList){
    this.reasonList=reasonList;
  }
  getReasonList(){
    return this.reasonList;
  }
  //getter setter for process
  setProcessList(processList){
    this.processStepList=processList;
  }
  getProcessList(){
    return this.processStepList;
  }
   //getter setter for machine
   setMachineList(machineList){
    this.machineStepList=machineList;
  }
  getMachineList(){
    return this.machineStepList;
  }
  
}
