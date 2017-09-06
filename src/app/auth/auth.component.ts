import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'gt-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    constructor(public auth: AuthService){}

    submitLogin(){
        this.auth.login();
    }

    ngOnInit() {
  }

}
