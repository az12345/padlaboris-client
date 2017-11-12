import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Patient} from '../../models/patient';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Procedure} from "../../models/procedure";
import {AuthService} from "../../services/auth.service";
import {Urls} from "../../util/urls";
import {Disease} from "../../models/disease";
import {Leave} from "../../models/leave";
import {Doctor} from "../../models/doctor";
import {Recipe} from "../../models/recipe";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patient: Patient = JSON.parse(AuthService.getAuthentication());
  diseases: Disease[] = [];
  leaves: Leave[] = [];
  doctors: Doctor[] = [];
  procedures: Procedure[] = [];
  recipes: Recipe[] = [];

  profileEditForm: FormGroup;

  constructor(private http: Http,
              private fb: FormBuilder) {
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

  getProcedures() {
    console.log(this.patient);
    this.http.get(Urls.getPatientProcedures(this.patient.id))
      .subscribe(data => {
        this.procedures = data.json();
      }, err => {

      });
  }

  getDiseases() {

  }

  getLeaves() {

  }

  getMds() {

  }

  getRecipes() {

  }
}
