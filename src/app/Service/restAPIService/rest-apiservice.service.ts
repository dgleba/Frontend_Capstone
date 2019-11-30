import {enviornment} from 'src/enviornment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UtilityServiceService } from '../utility-service.service';
import { timeout } from 'rxjs/operators';
import { timeoutWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { of, TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  // Define API
  apiURL = enviornment.apiURL1;
  constructor(private http: HttpClient, private utilityService: UtilityServiceService) { }
  // file upload header
  filehttpOptions={
    headers: new HttpHeaders({
      'Authorization': 'Bearer' + " " + this.utilityService.getToken()
    })
  }

  // HttpClient API Post() method => Fetch User list
  doLogin(user) {
    return this.http.post(this.apiURL + '/users/sign_in.json', user)
    .pipe(
      timeout(2000),
      map(res => {
        return res;
      }),
      catchError(this.handleError)
      // catchError(err => {
      //   console.log(err);
      //   if (err.name === 'TimeoutError') {
      //     this.setApiErrorResponse(err.message);
      //   }
      //   return Observable.throw(err)
      // }
      )
    
    
  }
  // API to deleteTag
  deleteTag(id){
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken()); 
    return this.http.delete(this.apiURL + '/tbl_quality_issues/'+id+'.json', {headers:myHeader})
    .pipe(
      catchError(this.handleError)
    )
  }

  //API to createTag
  createTag(tagData) {
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());  
    return this.http.post(this.apiURL + '/tbl_quality_issues.json', tagData,{headers:myHeader})
      .pipe(
        catchError(this.handleError)
      )
  }

  //API to updateTag
  updateTag(tagData,id){
    let myHeader=new HttpHeaders();
  myHeader=myHeader.append( 'Content-Type','application/json');
  myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());  
    console.log("in service update Tag", tagData);
    return this.http.put(this.apiURL + '/tbl_quality_issues/'+id+'.json', tagData,{headers:myHeader})
      .pipe(
        catchError(this.handleError)
      )
  }
  // Api to upload Image
  uploadImage(file1,file2,documents,id){
    console.log("image data", documents);
    const formData = new FormData();
    if(file1){
      formData.append('tbl_quality_issue[picture01]', file1);
    }    
    if(file2){
      formData.append('tbl_quality_issue[picture02]', file2);
    }    
    var ins = documents.length;
    if(ins>0){
      for (var x = 0; x < ins; x++) {
        formData.append('tbl_quality_issue[documents][]', documents[x]);      
      }   
    }    
    return this.http.put(this.apiURL + '/tbl_quality_issues/'+id+'.json',formData,this.filehttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

 // API to fetch qualityTag Data by Id
 getQualityTagDataById(id:number) {
  let myHeader=new HttpHeaders();
  myHeader=myHeader.append( 'Content-Type','application/json');
  myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
  return this.http.get(this.apiURL + '/tbl_quality_issues/'+id+'.json', {headers:myHeader})
    .pipe(
      catchError(this.handleError)
    )
}
// API to fetch CustomerList
getCustomerList(){
  let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
  return this.http.get(this.apiURL + '/tbl_customers.json',{headers:myHeader})
  .pipe(
    catchError(this.handleError)
  )
}
// API to fetch DispositionLIst
getDisposition(){
  let myHeader=new HttpHeaders();
  myHeader=myHeader.append( 'Content-Type','application/json');
  myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
return this.http.get(this.apiURL + '/tbl_cust_dispoistions.json',{headers:myHeader})
.pipe(
  catchError(this.handleError)
)
}

  // API to fetch Part Numer
  getPartList() {
   let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
    return this.http.get(this.apiURL + '/parts.json', {headers:myHeader})
      .pipe(
        catchError(this.handleError)
      )
  }


  // API to fetch Reason
  getReasonList() {
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
    return this.http.get(this.apiURL + '/tbl_htpc_reasons.json', {headers:myHeader})
      .pipe(
        catchError(this.handleError)
      )
  }
  // API to fetch processStep
  getProcessList() {
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
    return this.http.get(this.apiURL + '/depts.json', {headers:myHeader})
      .pipe(
        catchError(this.handleError)
      )
  }
  // API to fetch machineList
  getMachineList() {
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
    return this.http.get(this.apiURL + '/machines.json',{headers:myHeader})
      .pipe(
        catchError(this.handleError)
      )
  }
  //getAllQualtityTag
  getAllQualtityTag(){ 
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());  
    return this.http.get(this.apiURL + '/tbl_quality_issues.json',{headers:myHeader})
      .pipe(
        catchError(this.handleError)
      )
  }
  // api to search part number contains
  getPartListByContains(searchPartNumber){
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
    console.log("hearder",myHeader);
    let  params = new HttpParams();    
      params = params.append('q[PartID_cont]',searchPartNumber);   
    return this.http.get(this.apiURL + '/parts.json', {headers:myHeader,params:params})
    .pipe(
      catchError(this.handleError)
    )   
  }
  //searchBy api call
  getDataBySearch(searchObl){   
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
    let  params = new HttpParams();
    if(searchObl[0].value){
      params = params.append('q[id_cont]',searchObl[0].value);
    } 
    if(searchObl[1].value){
      params = params.append('q[PartID_cont]',searchObl[1].value);
    } 
    if(searchObl[2].value){  
      // date to be send in the form yyyy-mm   
      searchObl[2].value=searchObl[2].value.slice(0, 7); 
      params = params.append('q[date_cont]',searchObl[2].value);
    }
    if(searchObl[3].value){
      params=params.append('q[ProblemType_or_PartID_or_Issuedby_or_OpertionHd_or_OpertionTp_or_OpertionSp_or_OpertionQA_or_Reason_or_ReasonNote_or_Feature_or_Changed_or_Comment_or_SpecialInst_or_QualityAlert_or_QualityAlertMemo_or_CustomerRefNum_or_DispositionCustomer_or_DispositionStackpole_or_Okdby_or_FeatureNumber_or_OperationNumber_or_body_or_operation_cont_any]',searchObl[3].value);
    }   
    return this.http.get(this.apiURL + '/tbl_quality_issues.json', {headers:myHeader,params:params})
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error) {
    if (error instanceof HttpErrorResponse) {
      var errorMessage;
      if (error.error instanceof ErrorEvent) {
        console.error("Error Event");
      } else {
        switch (error.status) {
          case 401:      //login
            errorMessage = "Invalid Email or password."
            break;
          case 403:     //forbidden
            errorMessage = "Forbidden"
            break;
        }
      }
    } else if (error.name === 'TimeoutError') {
     }
    return throwError(error);
  }
 
  // set api error response
  setApiErrorResponse(errorMessage){
    var  apiData= this.utilityService.getApiResponse();
    apiData.msg=errorMessage;
    apiData.isApiCalled=true;
    apiData.isApiResponseSuccessful=false;
    setTimeout(function() {
      apiData.isApiCalled = false;
    }, 3000);
    this.utilityService.setApiResponse(apiData);
  }
  // set api succes response
  setApiSuccessmessage(message){
    var  apiData= this.utilityService.getApiResponse();
    apiData.msg=message;
    apiData.isApiCalled=true;
    apiData.isApiResponseSuccessful=true;
    setTimeout(function() {
      apiData.isApiCalled = false;
    }, 3000);
    this.utilityService.setApiResponse(apiData);
  }

}
