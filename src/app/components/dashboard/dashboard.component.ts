import {Component, OnInit} from '@angular/core';
import {Patient} from '../../models/patient';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Procedure} from "../../models/procedure";
import {AuthService} from "../../services/auth.service";
import {Urls} from "../../util/urls";
import {Disease} from "../../models/disease";
import {Leave} from "../../models/leave";
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

  private labelSuccess = 'Операция завершена!';
  private labelFail = 'Ошибка';

  patient: Patient;
  diseases: Disease[] = [];
  leaves: Leave[] = [];
  procedures: Procedure[] = [];
  recipes: Recipe[] = [];

  recipeToEdit: Recipe = null;
  recipeToDelete: Recipe = null;

  profileEditForm: FormGroup;
  diseaseEditForm: FormGroup;
  procedureAddForm: FormGroup;
  diseaseAddForm: FormGroup;
  recipeAddForm: FormGroup;
  recipeEditForm: FormGroup;

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
    this.diseaseAddForm = this.fb.group({
      diseaseName: [''],
      diseaseCode: [''],
      diseaseClass: [''],
      diseaseDescription: [''],
      startDate: [''],
      endDate: ['']
    });
    this.procedureAddForm = this.fb.group({
      name: [''],
      date: ['']
    });
    this.recipeAddForm = this.fb.group({
      issueDate: [''],
      expireDate: [''],
      medicineName: [''],
      dosage: ['']
    });
    this.recipeEditForm = this.fb.group({
      issueDate: [''],
      expireDate: [''],
      medicineName: [''],
      dosage: ['']
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
      this.showMessagePopup(this.labelSuccess, 'Пациент успешно обновлен!');
    }, err => {
      this.showMessagePopup(this.labelFail, 'Не удалось обновить пациента.', true);
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
          this.showMessagePopup(this.labelSuccess, 'Болезнь успешно удалена!');
        }
      }
    }, err => {
      this.showMessagePopup(this.labelFail, 'Не удалось удалить болезнь.', true);
    });
  }

  showEditDisease(event: Event) {
    $(event.target).closest('.tab-grid-item-wrapper')
      .find('.wrapper-edit-disease').show();
  }

  editDisease(disease: Disease, value: any) {

    this.http.put(Urls.putPatientDisease(this.patient.id),
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
            this.showMessagePopup(this.labelSuccess, 'Болезнь успешно изменена!');
          }
        }
      }, err => {
        this.showMessagePopup(this.labelFail, 'Не удалось изменить болезнь.', true);
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
      this.showMessagePopup(this.labelSuccess, 'Процедура успешно добавлена!');
    }, err => {
      this.showMessagePopup(this.labelFail, 'Не удалось добавить процедуру.', true);
    });

    this.procedureAddForm.reset();
  }

  showAddDisease() {
    $('.wrapper-add-disease').show();
  }

  addDisease(value: any) {
    this.http.post(Urls.postPatientDisease(this.patient.id), {
      diseaseName: value.diseaseName,
      diseaseDescription: value.diseaseDescription,
      diseaseCode: value.diseaseCode,
      diseaseClass: value.diseaseClass,
      startDate: new Date(value.startDate).getTime(),
      endDate: new Date(value.endDate).getTime(),
    }, {headers: HeaderUtils.withJsonAndToken()}).subscribe(data => {
      this.diseases.push(data.json());
      $('.form-wrapper').hide();
      this.showMessagePopup(this.labelSuccess, 'Болезнь успешно добавлена!');
    }, err => {
      this.showMessagePopup(this.labelFail, 'Не удалось добавить болезнь.', true);
    });

    this.diseaseAddForm.reset();
  }

  showDisease(disease: Disease, $event: Event) {
    const target = $($event.target);
    if (target.is('button') || target.is('a')) {
      return;
    }

    this.http.get(Urls.getDiseaseRecipes(disease.id),
      {headers: HeaderUtils.withToken()})
      .subscribe(data => {
        this.recipes = data.json();
      });

    target.closest('.tab-grid-item-wrapper')
      .find('.wrapper-disease').show();
  }

  showAddRecipe($event: Event) {
    $('.form-wrapper').hide(); // hide disease
    $($event.target).closest('.tab-grid-item-wrapper')
      .find('.wrapper-add-recipe').show();
  }

  addRecipe(disease: Disease, value: any) {
    this.http.post(Urls.postDiseaseRecipe(disease.id), {
      issueDate: new Date(value.issueDate).getTime(),
      expireDate: new Date(value.expireDate).getTime(),
      medicineName: value.medicineName,
      dosage: value.dosage
    }, {headers: HeaderUtils.withJsonAndToken()}).subscribe(data => {
      this.recipes.push(data.json());
      $('.form-wrapper').hide();
      this.showMessagePopup(this.labelSuccess, 'Рецепт успешно добавлен!');
    }, err => {
      this.showMessagePopup(this.labelFail, 'Не удалось добавить рецепт.', true);
    });

    this.recipeAddForm.reset();
  }

  editRecipe(value: any) {
    this.http.post(Urls.postDiseaseRecipe(this.recipeToEdit.disease.id), {
      id: this.recipeToEdit.id,
      issueDate: new Date(value.issueDate).getTime(),
      expireDate: new Date(value.expireDate).getTime(),
      medicineName: value.medicineName,
      dosage: value.dosage
    }, {headers: HeaderUtils.withJsonAndToken()}).subscribe(data => {
      for (let i = 0; i < this.recipes.length; i++) {
        if (this.recipes[i].id === this.recipeToEdit.id) {
          this.recipes[i] = data.json();
          $('.form-wrapper').hide();
          this.showMessagePopup(this.labelSuccess, 'Рецепт успешно изменен!');
        }
      }
    }, err => {
      this.showMessagePopup(this.labelFail, 'Не удалось изменить рецепт.', true);
    });

    this.recipeEditForm.reset();
  }

  showEditRecipe(recipe: Recipe) {
    this.recipeToEdit = recipe;
    $('.form-wrapper').hide();
    $('.wrapper-edit-recipe').show();
  }

  showDeleteRecipe(recipe: Recipe) {
    this.recipeToDelete = recipe;
    $('.form-wrapper').hide();
    $('.wrapper-delete-recipe').show();
  }

  deleteRecipe() {
    this.http.delete(Urls.deleteDiseaseRecipe(
      this.recipeToDelete.disease.id, this.recipeToDelete.id),
      {headers: HeaderUtils.withToken()}).subscribe(data => {
      $('.form-wrapper').hide();
      this.showMessagePopup(this.labelSuccess, 'Рецепт успешно удален!');
    }, err => {
      this.showMessagePopup(this.labelFail, 'Не удалось удалить рецепт.', true);
    });
  }

  showMessagePopup(label, message, fail = false) {
    const popup = $('.message-popup');
    popup.addClass('on');
    popup.find('h4').text(label);
    popup.find('p').text(message);

    if (fail) {
      popup.addClass('alert-danger');
    } else {
      popup.removeClass('alert-danger');
    }

    setTimeout(function () {
      popup.removeClass('on');
    }, 4000);
  }
}
