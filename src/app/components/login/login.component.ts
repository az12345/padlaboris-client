import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import {Urls} from "../../util/urls";
import {HeaderUtils} from "../../util/header-utils";
import {HttpHandler} from "../../util/httphandler";

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorMessage: String;

  constructor(private router: Router,
              private fb: FormBuilder,
              private http: HttpHandler) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login(body) {

    $('.progress').addClass('on');

    this.http.post(Urls.postAuth(),
      body,
      {headers: HeaderUtils.withJson()}).subscribe(data => {
      AuthService.setToken(data.headers.get('access-token'));

      $('.progress').removeClass('on');
      this.router.navigate(['/dashboard']);
      this.errorMessage = '';
    }, err => {
      this.errorMessage = 'Неверный логин или пароль!';
      $('.progress').removeClass('on');
    });
  }
}
