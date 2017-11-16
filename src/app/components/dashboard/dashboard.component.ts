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
import {HeaderUtils} from "../../util/header-utils";
import {HttpHandler} from "../../util/httphandler";

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patient: Patient;
  diseases: Disease[] = [];
  leaves: Leave[] = [];
  doctors: Doctor[] = [];
  procedures: Procedure[] = [];
  recipes: Recipe[] = [];

  profileEditForm: FormGroup;

  constructor(private http: HttpHandler,
              private fb: FormBuilder) {
  }

  ngOnInit() {

    $('.load-screen').addClass('on');

    this.http.get(Urls.getPatient(1),
      {headers: HeaderUtils.withToken()})
      .subscribe(data => {
        this.patient = data.json();
        AuthService.setAuthentication(this.patient);
        setTimeout(function () {
          $('.load-screen').removeClass('on');
        }, 500);
      });
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

    this.profileEditForm.reset();
    $('.form-wrapper').hide();

    return false;
  }

  getProcedures() {

    this.http.get(Urls.getPatientProcedures(this.patient.id),
      {headers: HeaderUtils.withToken()})
      .subscribe(data => {
        this.procedures = data.json();
      });
  }

  getDiseases() {

    this.http.get(Urls.getPatientDiseases(this.patient.id),
      {headers: HeaderUtils.withToken()})
      .subscribe(data => {
        this.diseases = data.json();
      });
  }

  getLeaves() {

  }

  getMds() {

  }

  getRecipes() {

    this.http.get(Urls.getPatientProcedures(this.patient.id),
      {headers: HeaderUtils.withToken()})
      .subscribe(data => {
        this.procedures = data.json();
      });
  }

  dateString(ms: number) {
    return new Date(ms).toDateString();
  }
}
