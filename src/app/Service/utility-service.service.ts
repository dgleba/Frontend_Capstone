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
  
}
