import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserSessionService} from '../user-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName;
  password;

  constructor(public router: Router, private user: UserSessionService) {
  }

  ngOnInit() {
  }

  loginUser(e) {
    e.preventDefault();
    this.userName = e.target.elements[0].value;
    this.password = e.target.elements[1].value;

    if (this.userName === 'Abdul' && this.password === '123456') {
      this.user.setUserLoggedIn();
      this.user.setUserLoggedInUserName(this.userName);
      this.router.navigate(['receipt']);
    }
  }

}
