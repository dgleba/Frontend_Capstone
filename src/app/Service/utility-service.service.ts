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
  processNum:string;
  machineNum:string;

  constructor() { }
 
  getTagsummaryList()
  {
    return this.tagSummaryOption;
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
    console.log("in utilit to set the part num",this.partNum);

  }
  getSelectedPartNum(){
    console.log("in utilit to get the part num",this.partNum);
    return this.partNum;

  }
  
}
