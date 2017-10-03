import { Injectable } from '@angular/core';



@Injectable()
export class UserService {

  currentUser = null;

  getCurrentUserId() : String {
      return this.currentUser;
    
  }

  setCurrentUserId(currentUserId) : void {
    this.currentUser = currentUserId;
  
}
  

}
