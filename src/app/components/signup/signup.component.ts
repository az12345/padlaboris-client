import { Component, OnInit } from '@angular/core';
import {UserSignup} from '../../models/user-signup';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirm: string;

  constructor(public user: UserSignup) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    form.reset();
    return false;
  }
}
