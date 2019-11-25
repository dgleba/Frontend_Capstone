import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UtilityServiceService } from '../utility-service.service';
import { Partnumber } from 'src/app/Model/partnumber';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  // Define API
  apiURL = 'http://192.168.0.41:6036';
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
    formData.append('tbl_quality_issue[picture01]', file1);
    formData.append('tbl_quality_issue[picture02]', file2);
    var ins = documents.length;
    for (var x = 0; x < ins; x++) {
      formData.append('tbl_quality_issue[documents][]', documents[x]);      
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
  getListByContains(searchPartNumber,searchReason,searchProcess){
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
    console.log("hearder",myHeader);
    let  params = new HttpParams();
    if(searchPartNumber){
      params = params.append('q[PartID_cont]',searchPartNumber);
    }else if(searchReason){
      params = params.append('q[Reason_cont]',searchReason);
    }else if(searchProcess){
      params = params.append('q[Reason_cont]',searchReason);
    }   
    return this.http.get(this.apiURL + '/tbl_quality_issues.json', {headers:myHeader,params:params})
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
    console.log("params",params);
    return this.http.get(this.apiURL + '/tbl_quality_issues.json', {headers:myHeader,params:params})
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = error.error.error;
    // if (error.error instanceof ErrorEvent) {
    //   // Get client-side error
    //   errorMessage = error.error.message;
      
    // } else {
    //   // Get server-side error
    //   if(error.status==401){
    //     console.log("error is un");
    //   }
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    // console.log("error",errorMessage); 
    return throwError(errorMessage);
  }
  // set api error response
  setApiErrorResponse(errorMessage){
    var  apiData= this.utilityService.getApiResponse();
    apiData.msg=errorMessage;
    apiData.isApiCalled=true;
    apiData.isApiResponseSuccessful=false;
    this.utilityService.setApiResponse(apiData);
  }
  // set api succes response
  setApiSuccessmessage(message){
    var  apiData= this.utilityService.getApiResponse();
    apiData.msg=message;
    apiData.isApiCalled=true;
    apiData.isApiResponseSuccessful=true;
    console.log("api response",apiData);
    this.utilityService.setApiResponse(apiData);
  }

}
