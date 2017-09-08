import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'gt-secondary-nav',
  templateUrl: './secondary-nav.component.html',
  styleUrls: ['./secondary-nav.component.css']
})
export class SecondaryNavComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  doLogout() {
    this.auth.logout();

  }

  doLogin(){
    this.auth.login();
  }

}
