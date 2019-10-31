import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
   
    constructor(
       
        private route: ActivatedRoute,
        private router: Router
    ) {
        // redirect to home if already logged in
       
    }

    ngOnInit() {
        

        
       
    }



    onSubmit() {  
        this.router.navigate(['/home']  ,{ relativeTo: this.route });
    }
}
