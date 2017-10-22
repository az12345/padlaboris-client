import { Injectable } from '@angular/core';
import {UserSignup} from '../models/user-signup';

@Injectable()
export class AuthService {

  constructor() { }

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('user', JSON.stringify({username, password}));
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

  signUp(user: UserSignup) {
    return true;
  }
}
