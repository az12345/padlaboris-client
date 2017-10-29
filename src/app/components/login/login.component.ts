import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: String;

  constructor(public user: User,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    const loginSuccess = this.authService.login(this.user.username, this.user.password);

    if (loginSuccess) {
      this.router.navigate(['/dashboard']);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Incorrect username or password!';
    }
  }
}
