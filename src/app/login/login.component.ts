import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { RestAPIService } from "../Service/restAPIService/rest-apiservice.service";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    @Input() userDetails = {email: '', password:''}
    constructor(
        public restApi: RestAPIService, 
       private router: Router
    ) {
        // redirect to home if already logged in
    }

    ngOnInit() {
    }

    loginUser() {
        this.restApi.doLogin(this.userDetails).subscribe((data: {
        }) => {
            console.log(data);
            this.router.navigate(['/home'])
        })
      }


   
}
