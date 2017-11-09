import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../../models/user';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profileEditForm: FormGroup;

  constructor(private http: Http,
              private fb: FormBuilder,
              public userService: UserService) {
  }

  ngOnInit() {
    this.initForms();
  }

  private initForms() {
    this.profileEditForm = this.fb.group({
      mobileNumber: [''],
      homeNumber: [''],
    });
  }

  showInfo() {
    $('.wrapper-info').show();
  }

  hideWrapper(event) {
    const formWrapper = $('.form-wrapper');
    const target = $(event.target);

    if (target.is(formWrapper) || target.is('button[type="button"]')) {
      formWrapper.hide();
    }
  }

  showEdit() {
    $('.wrapper-edit').show();
  }

  editProfile(body, $event: Event) {
    console.log(body);




    this.profileEditForm.reset();
    $('.form-wrapper').hide();

    return false;
  }
}
