import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  success: boolean;
  message: string;
  auth: AuthenticationService;

  constructor(auth: AuthenticationService) {
    this.auth = auth;
    this.message = '';
   }

  ngOnInit() {
  }

  register(email: string, password: string) {
    this.auth.SignUpUser(email, password)
    .then((result) => {
      this.success = true;
      this.auth.addUserRole(email, 'user');
      this.message = 'Zarejestrowano użytkownika: ' + result.user.email + ' pomyślnie!'; })
    .catch((error) => { this.success = false; this.message = error.message; });
  }

}
