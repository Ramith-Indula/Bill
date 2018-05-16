import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private isUserLoggedIn;
  public userName;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  setUserLoggedInUserName(username) {

    this.userName = username;
  }
  getUserLoggedInUserName() {

    return this.userName ;
  }

}
