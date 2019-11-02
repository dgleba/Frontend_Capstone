import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { RestAPIService } from "../Service/restAPIService/rest-apiservice.service";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    @Input() userDetails = {user:{email: '', password:''}}
    constructor(public restApi: RestAPIService, private router: Router) {}
    ngOnInit() {
    }
    loginUser() {
        console.log(this.userDetails);
        this.restApi.doLogin(this.userDetails).subscribe((data:any 
        ) => {
            console.log(data);
            localStorage.setItem('token',data.token)
            this.router.navigate(['/home'])
        })
      }
   
}
