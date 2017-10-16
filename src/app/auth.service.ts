import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { GoogleLoginProvider } from "./google.login.provider";
import { User } from "./user";

import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AuthService {

  private _user: User = null;
  private _authState: BehaviorSubject<User> = new BehaviorSubject(null);

  get authState(): Observable<User> {
    return this._authState.asObservable();
  }

  constructor(private googleLoginProvider:GoogleLoginProvider, private http: Http) {
    
     googleLoginProvider.initialize().then((user: User) => {
        this._user = user;
        this._authState.next(user);
      }).catch((err) => {
        // this._authState.next(null);
      });

  }

  signIn(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.googleLoginProvider.signIn().then((user: User) => {

        console.log(user.token);
        
        let body = {token:user.token};
        this.http.post(`/auth`, body)
              .map(res => res.json())
              .subscribe(res => { 

                if(res.OK) {
                    resolve(user);
                }
              });
                
                
      
          

          this._user = user;
          this._authState.next(user);

        });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.googleLoginProvider.signOut().then(() => {
          resolve();

          this._user = null;
          this._authState.next(null);
        });
      
    });
  }

}