import {Injectable, OnInit} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';
import { User } from './user';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public token: string;
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    let authHeader = "";
    let user = this.auth.getUser();
    if (user) {
        authHeader = user.token;
    }
    
    

    //this.auth.getAuthorizationHeader();
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
    console.log(authReq);
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }


  
  
}