import {Injectable} from '@angular/core';
import {Patient} from "../models/patient";

@Injectable()
export class AuthService {

  constructor() { }

  static login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      const patient = new Patient();

      patient.id = 1;
      patient.firstName = 'Tomas';
      patient.lastName = 'Kolbasso';
      patient.username = patient.firstName + ' ' + patient.lastName;
      patient.gender = 'Male';
      patient.birthDate = new Date().getTime();
      patient.lastChangeDate = new Date().getTime();
      patient.homeNumber = '5553535';
      patient.mobileNumber = '33366691';

      localStorage.setItem('patient', JSON.stringify(patient));
      return true;
    }

    return false;
  }

  static logout() {
    localStorage.removeItem('patient');
  }

  static isAuthenticated() {
    return localStorage.getItem('patient') != null;
  }

  static getAuthentication() {
    return localStorage.getItem('patient');
  }
}
