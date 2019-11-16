import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {QualityTagData} from '../Model/qualtiyTagData';
import {Partnumber} from 'src/app/Model/partnumber';
import {Reason} from 'src/app/Model/reason';
import { ProcessStep } from 'src/app/Model/processStep';
import { MachineStep } from 'src/app/Model/machine';

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
  public internalTagData:QualityTagData;
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

  setSelectedPartNum(partNum:string){
    this.partNum=partNum;   
  }
  getSelectedPartNum(){    
    return this.partNum;
  }
  setSelectedMachineStep(machineNum:string){
    this.machineNum=machineNum;   
  }
  getSelectedMachineStep(){    
    return this.machineNum;
  }
  setSelectedProcessStep(processStep:string){
    this.processNum=processStep;   
  }
  getSelectedProcessStep(){    
    return this.processNum;
  }
  setSelectedReason(reason:string){
    this.reason=reason;   
  }
  getSelectedReason(){    
    return this.reason;  
  }

  setLengthOfChange(length:string){
    this.lengthOfChange=length;   
  }
  getLengthOfChange(){    
    return this.lengthOfChange;  
  }
  setBody(body:string){
    this.body=body;   
  }
  getBody(){    
    return this.body;  
  }

  setOkdBy(okdBy:string){
    this.okdBy=okdBy;   
  }
  getOkdBy(){    
    return this.okdBy;  
  }

  setQuantity(qt:number){
    this.quatity=qt;   
  }
  getSetQuantity(){    
    return this.quatity;  
  }

  setIssuedBy(issuedBy:string){
    this.issuedBy=issuedBy;   
  }
  getIssuedBy(){    
    return this.issuedBy;  
  }

  clearData(){
    this.issuedBy='';
    this.partNum='';
    this.reason='';
    this.okdBy='';
    this.quatity=0;
    this.body='';
  }

  //getter setter for qualityTagData
  setInternalTagData(internalTagObj){
    this.internalTagData=internalTagObj;
  }
  getInternalTagData(){
    return this.internalTagData;
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
