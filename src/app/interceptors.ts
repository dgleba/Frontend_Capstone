import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UtilityServiceService } from './Service/utility-service.service';
import { Router} from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(public utilityService: UtilityServiceService, public router: Router) {

  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let timeStr = localStorage.getItem('LAST_REFRESH_TIME');
    let timeMs = Number(timeStr);
    let currentTime = Date.now();

    if (currentTime - timeMs >= (60 * 60 * 1000)) { // change it to one hour by adding (60 * 60 * 1000)
      console.log('Session exprired, navigating to login page');
      localStorage.removeItem('LAST_REFRESH_TIME');
      this.utilityService.deleteToken();
      this.router.navigate(['/login']);
      return;
    } else {
      console.log('session is valid');
      localStorage.setItem('LAST_REFRESH_TIME', currentTime.toString());
    }

    const customReq = request.clone({});
    return next.handle(customReq);
  }
}
