import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../Model/user'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  // Define API
  apiURL = 'http://192.168.0.32:6036';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API Post() method => Fetch User list
  doLogin(user): Observable<User> {
    console.log("in service",user);
   
    return this.http.post<User>(this.apiURL + '/users/sign_in.json', JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
