import { Injectable } from '@angular/core';
import {QualityTagData} from '../Model/qualtiyTagData';
import {Partnumber} from 'src/app/Model/partnumber';
import {Reason} from 'src/app/Model/reason';
import { ProcessStep } from 'src/app/Model/processStep';
import { MachineStep } from 'src/app/Model/machine';
import {RestAPIService} from 'src/app/Service/restAPIService/rest-apiservice.service'
import { Customer } from '../Model/customer';

@Injectable({
    providedIn: 'root'
  })
  export class ExternalUtilityServiceService{  
    constructor(private restAPIService : RestAPIService  ) { }

   
 

  
 
}