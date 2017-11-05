import { Component, OnInit } from '@angular/core';
import {UserSignup} from '../../models/user-signup';
import {FormControl, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      gender: new FormControl('male'),
      birthDate: new FormControl(''),
      password: new FormControl(''),
      confirm: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  onSubmit(body) {

    console.log(body);
    this.form.reset({gender: 'male'});
    return false;
  }
}
