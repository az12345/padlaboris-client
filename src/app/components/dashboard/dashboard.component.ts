import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../../models/user';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {

  }

  showInfo() {
    $('.form-wrapper').show();
  }

  hideWrapper(event) {
    const formWrapper = $('.form-wrapper');

    if (!$(event.target).is(formWrapper)) {
      return;
    }

    formWrapper.hide();
  }
}
