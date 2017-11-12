import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
    AuthService.logout();
    this.router.navigate(['/login']);
  }
}
