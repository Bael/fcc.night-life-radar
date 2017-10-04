import { Injectable } from '@angular/core';
import { User } from "./user";



@Injectable()
export class UserService {

  currentUser:User = null;

  getCurrentUser() : User {
      return this.currentUser;
    
  }

  setCurrentUser(currentUser:User) : void {
    this.currentUser = currentUser;
  
}
  

}
