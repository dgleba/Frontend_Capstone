import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {QualityTagData} from '../Model/qualtiyTagData';
import {Partnumber} from 'src/app/Model/partnumber';
import {Reason} from 'src/app/Model/reason';
import { ProcessStep } from 'src/app/Model/processStep';
import { MachineStep } from 'src/app/Model/machine';
import {ExternalTagData} from 'src/app/Model/externalTagData';
@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {
tagSummaryOption : any = [
  {id: '1', tagName: 'Quality Alert', isChecked: false},
  {id: '2', tagName: 'Hold Tag', isChecked: false},
  {id: '3', tagName: 'TPC Tag', isChecked: false},
  {id: '4', tagName: 'Special Instruction', isChecked: false},
  {id: '5', tagName: 'Quality Alert - IN', isChecked: false},
  {id: '6', tagName: 'Supplier Issue', isChecked: false}];
  public internalTagData=new QualityTagData;
  public externalTagData = new ExternalTagData;
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
  todaysDate:Date;
  constructor(private datePipe: DatePipe) { 
  this.todaysDate = new Date();
   console.log(this.datePipe.transform(this.todaysDate,"yyyy-MM-dd HH:mm:ss"));
  } 

  getTodaysDate(){
    return this.todaysDate;
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

  //getter setter for qualityTagData
  setInternalTagData(internalTagObj){
    this.internalTagData=internalTagObj;
  }
  getInternalTagData(){
    return this.internalTagData;
  }
   //getter setter for externaTagData
   setExternalTagData(externalObj){
    this.externalTagData=externalObj;
  }
  getExternalTagData(){
    return this.externalTagData;
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
