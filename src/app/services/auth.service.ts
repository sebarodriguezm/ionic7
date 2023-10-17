import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser() {
    console.log('currentuserservice', this.currentUser)
    return this.currentUser;
  }
}