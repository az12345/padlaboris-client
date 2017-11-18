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
  diseaseEditForm: FormGroup;
  addProcedureForm: FormGroup;

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
    this.diseaseEditForm = this.fb.group({
      diseaseName: [''],
      diseaseCode: [''],
      diseaseClass: [''],
      diseaseDescription: [''],
      startDate: [''],
      endDate: ['']
    });
    this.addProcedureForm = this.fb.group({
      name: [''],
      date: ['']
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

  editProfile(body) {

    if (!body.mobileNumber) {
      body.mobileNumber = this.patient.mobileNumber;
    }

    if (!body.homeNumber) {
      body.homeNumber = this.patient.homeNumber;
    }

    this.http.put(Urls.putPatient(), {
      id: this.patient.id,
      mobileNumber: body.mobileNumber,
      homeNumber: body.homeNumber
    }, {headers: HeaderUtils.withJsonAndToken()}).subscribe(data => {
      this.patient = data.json();
    }, err => {
      console.log('Failed to update patient');
    });

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

  getRecipes() {

    this.http.get(Urls.getPatientProcedures(this.patient.id),
      {headers: HeaderUtils.withToken()})
      .subscribe(data => {
        this.procedures = data.json();
      });
  }

  createDisease(body) {

  }

  dateString(ms: number) {
    if (!ms) {
      return "";
    }
    return new Date(ms).toDateString();
  }

  showDeleteDisease(event) {
    $(event.target).closest('.tab-grid-item-wrapper')
      .find('.wrapper-delete-disease').show();
  }

  deleteDisease(disease: Disease) {
    this.http.delete(Urls.deletePatientDisease(this.patient.id, disease.id),
      {headers: HeaderUtils.withToken()}).subscribe(data => {
        for (let i = 0; i < this.diseases.length; i++) {
          if (this.diseases[i].id === disease.id) {
            this.diseases.splice(i, 1);
            $('.form-wrapper').hide();
          }
        }
    }, err => {
        console.log('Error occurred while delete disease ' + disease.id);
    });
  }

  showEditDisease(event: Event) {
    $(event.target).closest('.tab-grid-item-wrapper')
      .find('.wrapper-edit-disease').show();
  }

  editDisease(disease: Disease, value: any) {

    this.http.put(Urls.postPatientDisease(this.patient.id),
      {
        id: disease.id,
        diseaseName: value.diseaseName,
        diseaseDescription: value.diseaseDescription,
        diseaseClass: value.diseaseClass,
        diseaseCode: value.diseaseCode,
        startDate: new Date(value.startDate).getTime(),
        endDate: new Date(value.endDate).getTime()
      },
      {headers: HeaderUtils.withJsonAndToken()})
      .subscribe(data => {
        for (let i = 0; i < this.diseases.length; i++) {
          if (this.diseases[i].id === disease.id) {
            this.diseases[i] = data.json();
            $('.form-wrapper').hide();
          }
        }
      }, err => {
        console.log('Error occurred creating disease');
      });
    this.diseaseEditForm.reset();
  }

  showAddProcedure() {
    $('.wrapper-add-procedure').show();
  }

  addProcedure(value: any) {
    this.http.post(Urls.postPatientProcedure(this.patient.id), {
      procedureName: value.name,
      date: new Date(value.date).getTime()
    }, {headers: HeaderUtils.withJsonAndToken()}).subscribe(data => {
      this.procedures.push(data.json());
      $('.form-wrapper').hide();
    }, err => {
      console.log('Failed to create a procedure');
    });

    this.addProcedureForm.reset();
  }
}
