import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth: AuthenticationService;
  message: string;

  constructor(auth: AuthenticationService) {
    this.auth = auth;
    this.message = '';
   }

  ngOnInit() {
  }

  login(email: string, password: string) {
    // console.log(this.auth.getUserRole);
    this.auth.SignInUser(email, password).then(() => {this.message = ''; })
    .catch((error) => { this.message = error.message; });

  }

}
