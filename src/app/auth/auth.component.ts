import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'gt-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    isAuthenticated: boolean;

    constructor(public auth: AuthService){}

    submitLogin(){
        this.auth.login();
    }

    ngOnInit() {
        this.isAuthenticated = this.auth.isAuthenticated();
  }

}
