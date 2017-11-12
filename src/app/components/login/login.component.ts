import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorMessage: String;

  constructor(private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login(body) {

    const loginSuccess = AuthService.login(body.username, body.password);

    if (loginSuccess) {
      this.router.navigate(['/dashboard']);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Incorrect username or password!';
    }
  }
}
