import { Injectable } from '@angular/core';
import {UserSignup} from '../models/user-signup';

@Injectable()
export class AuthService {

  constructor() { }

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('user', JSON.stringify({
        username,
        firstName: 'Tomas',
        lastName: 'Kolbasso',
        birthDate: '19.09.1997',
        lasChangeDate: '21.10.2020',
        gender: 'Male',
        homeNumber: '5553535',
        mobileNumber: '33366691'}));
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return localStorage.getItem('user') != null;
  }

  getAuthentication() {
    return localStorage.getItem('user');
  }

  signUp(user: UserSignup) {
    return true;
  }
}
