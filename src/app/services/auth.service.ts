import {Injectable} from '@angular/core';
import {Patient} from "../models/patient";

@Injectable()
export class AuthService {

  constructor() { }

  static logout() {
    localStorage.removeItem('patient');
    localStorage.removeItem('token');
  }

  static isAuthenticated() {
    return AuthService.getToken() != null;
  }

  static setAuthentication(patient: Patient) {
    localStorage.setItem('patient', JSON.stringify(patient));
  }

  static getAuthentication(): any {
    return localStorage.getItem('patient');
  }

  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }
}
