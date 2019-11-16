import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UtilityServiceService } from '../utility-service.service';



@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  // Define API
  apiURL = 'http://192.168.0.41:6036';


  constructor(private http: HttpClient, private utilityService: UtilityServiceService) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + this.utilityService.getToken()
    })
  }
  // file upload header
  filehttpOptions={
    headers: new HttpHeaders({
      'Authorization': 'Bearer' + " " + this.utilityService.getToken()
    })
  }

  // HttpClient API Post() method => Fetch User list
  doLogin(user) {
    console.log("in service", user);
    return this.http.post(this.apiURL + '/users/sign_in.json', user)
      .pipe(
        catchError(this.handleError)
      )
  }

  //API to createTag
  createTag(tagData) {
    console.log("in service create tag", tagData);
    return this.http.post(this.apiURL + '/tbl_quality_issues.json', tagData,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )

  }

  //API to updateTag
  updateTag(tagData,id){
    console.log("in service update Tag", tagData);
    return this.http.put(this.apiURL + '/tbl_quality_issues/'+id+'.json', tagData,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  // Api to upload Image
  uploadImage(file){
    console.log("image data", file);
    const formData = new FormData();
    formData.append('country_of_origin[avatar]', file);
    return this.http.put(this.apiURL + '/country_of_origins/10.json',formData,this.filehttpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

 // API to fetch qualityTag Data by Id
 getQualityTagDataById(id:number) {
  return this.http.get(this.apiURL + '/tbl_quality_issues/'+id+'.json', this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
}

  // API to fetch Part Numer
  getPartList() {
    return this.http.get(this.apiURL + '/parts.json', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // API to fetch Reason
  getReasonList() {
    return this.http.get(this.apiURL + '/tbl_htpc_reasons.json', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  // API to fetch processStep
  getProcessList() {
    return this.http.get(this.apiURL + '/depts.json', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  // API to fetch machineList
  getMachineList() {
    return this.http.get(this.apiURL + '/machines.json', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  //getAllQualtityTag
  getAllQualtityTag(){   
    return this.http.get(this.apiURL + '/tbl_quality_issues.json', this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  //searchBy api call
  getDataBySearch(searchObl){
    let myHeader=new HttpHeaders();
    myHeader=myHeader.append( 'Content-Type','application/json');
    myHeader=myHeader.append( 'Authorization','Bearer' + " " + this.utilityService.getToken());
    console.log("hearder",myHeader);
    let  params = new HttpParams();
    params = params.append('utf8','%E2%9C%93');
    if(searchObl[0].value){
      params = params.append('q%5Bid_cont%5D',searchObl[0].value);
    } 
    if(searchObl[1].value){
      params = params.append('q%5BPartID_cont%5D',searchObl[1].value);
    } 
    if(searchObl[2].value){
      params = params.append('q%5Bdate_cont%5D',searchObl[3].value);
    }   
    console.log("params",params);
    return this.http.get(this.apiURL + '/tbl_quality_issues.json', {headers:myHeader,params:params})
    .pipe(
      catchError(this.handleError)
    )
  }



  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log("error",errorMessage);  
    return throwError(errorMessage);
  }






}
