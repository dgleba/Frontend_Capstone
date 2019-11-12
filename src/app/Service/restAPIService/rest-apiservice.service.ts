import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UtilityServiceService } from '../utility-service.service';


@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  // Define API
  apiURL = 'http://192.168.0.40:6036';


  constructor(private http: HttpClient, private utilityService: UtilityServiceService) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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
