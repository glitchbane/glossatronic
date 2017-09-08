import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'gt-secondary-nav-component',
  templateUrl: './secondary-nav-component.component.html',
  styleUrls: ['./secondary-nav-component.component.css']
})
export class SecondaryNavComponentComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  doLogout() {
    this.auth.logout();
  }

  doLogin(){
    this.auth.login();
  }

}
