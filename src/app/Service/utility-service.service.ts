import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {
tagSummaryOption : any = [
  {id: '1', tagName: 'Quality Alert', isChecked: false},
  {id: '2', tagName: 'Hold Tag', isChecked: false},
  {id: '3', tagName: 'TPC Tag', isChecked: false},
  {id: '4', tagName: 'Special Instruction', isChecked: false},
  {id: '5', tagName: 'Quality Alert - IN', isChecked: false}];
  token : string;
  partNum:string;
  reason:string;
  processNum:string;
  machineNum:string;

  constructor() { }
 
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
  
}
