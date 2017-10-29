import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private http: Http) { }

  ngOnInit() {
    // this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&")
    //   .subscribe(response => console.log(response.json()));


  }

}
