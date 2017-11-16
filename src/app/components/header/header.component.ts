import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return AuthService.isAuthenticated();
  }

  logout() {
    $('.load-screen').addClass('on');
    const self = this;

    setTimeout(function () {
      $('.load-screen').removeClass('on');
      AuthService.logout();
      self.router.navigate(['/login']);
    }, 500);
  }
}
