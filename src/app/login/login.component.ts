import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { RestAPIService } from "../Service/restAPIService/rest-apiservice.service";
import { UtilityServiceService } from '../Service/utility-service.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    @Input() userDetails = {user:{email: '', password:''}}
    constructor(public restApi: RestAPIService, public utilityApi: UtilityServiceService, private router: Router) {}
    apiData=this.utilityApi.getApiResponse();
   
    ngOnInit() {
        this.apiData.isApiCalled=false;
    }
    loginUser() {
        this.restApi.doLogin(this.userDetails).subscribe((data:any) => {
            console.log(data);
            this.restApi.setApiSuccessmessage("Login Successful")
            this.utilityApi.setToken(data.token);
            this.router.navigate(['/home'])
        },
        error => {
            this.restApi.setApiErrorResponse(error)
        });
      }
   
}
