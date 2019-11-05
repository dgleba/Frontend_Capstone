import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {
tagSummaryOption : any = [
  {id: '1', tagName: 'Quality Alert', isChecked: false,tagVlue:0},
  {id: '2', tagName: 'Hold Tag', isChecked: false,tagVlue:0},
  {id: '3', tagName: 'TPC Tag', isChecked: false,tagVlue:0},
  {id: '4', tagName: 'Special Instruction', isChecked: false,tagVlue:0},
  {id: '5', tagName: 'Quality Alert - IN', isChecked: false,tagVlue:0},
  {id: '6', tagName: 'Supplier Issue', isChecked: false,tagVlue:0}];
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
  
}
