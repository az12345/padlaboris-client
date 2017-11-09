import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {UserService} from "./user.service";

@Injectable()
export class AuthService {

  constructor(private userService: UserService) { }

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      const user = new User();

      user.firstName = 'Tomas';
      user.lastName = 'Kolbasso';
      user.username = user.firstName + ' ' + user.lastName;
      user.gender = 'Male';
      user.birthDate = new Date().getTime();
      user.lastChangeDate = new Date().getTime();
      user.homeNumber = '5553535';
      user.mobileNumber = '33366691';

      this.userService.user = user;
      localStorage.setItem('user', JSON.stringify(user));
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
}
