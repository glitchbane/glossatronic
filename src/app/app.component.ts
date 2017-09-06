import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {State} from './store/reducer.index';
import {AuthService} from './auth/auth.service';
import {LoginUserAction} from './store/user/user.actions';
import {Store} from '@ngrx/store';

@Component({
               selector: 'gt-root',
               templateUrl: './app.component.html'
           })


export class AppComponent implements OnInit {

  constructor(private auth: AuthService,  private store: Store<State>, private router: Router){}

  ngOnInit(){
    if (this.auth.isAuthenticated()) {
        const userEmail: string = JSON.parse(localStorage.getItem("loginEmail"));
        this.store.dispatch(new LoginUserAction(userEmail));
    }
    else {
      this.router.navigate(['/login'])
    }
  }
}
