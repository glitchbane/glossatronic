/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {AuthService} from "./auth.service";
import * as testHelper from "./auth.test.helper";
import {Router} from "@angular/router";

import {Observable} from "rxjs";

import {UserDataService} from '../store/user/user.data.service';
import {User} from '../models/user/user.model'
import {RouterTestingModule} from '@angular/router/testing';
import {StoreMockService} from '../test-helper';
import {Store} from '@ngrx/store';
let Auth0Lock = require('auth0-lock').default;

describe('AuthService', () => {

  const user: User = {id: 234, firstName: 'Mickey', lastName: 'Mouse', email: 'email@email.com', roleId: 2}
  let promiseValue = Observable.of(user);
  let userDataService = {
    loginUser: jasmine.createSpy('loginUser').and.returnValue(promiseValue)
  }


  let service: AuthService             = null;
  let router                           = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({

                                       providers: [
                                           AuthService,
                                           {provide: Store, useClass: StoreMockService}
                                       ],
                                       imports: [
                                           RouterTestingModule
                                       ]
                                   })
           .compileComponents();
  }));

  // beforeEach(inject([AuthService, UserDataService, Router], (auth: AuthService, data: UserDataService, routerTesting: Router) => {
  beforeEach(inject([AuthService], (auth: AuthService) => {
    service         = auth;
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('login', () => {

    it ('should show the lock', () => {
      spyOn(service.lock, 'show');

      service.login();

      expect(service.lock.show).toHaveBeenCalled();
    });

    it('should check to see if the user is authenticated', () => {
      // arrange
      spyOn(service, 'isAuthenticated');
      // set a spy on the lock show method so that it won't really show'
      spyOn(service.lock, 'show');


      // act
      service.login();

      // assert
      expect(service.isAuthenticated).toHaveBeenCalled();

    });

    it('when user is authenticated and user profile is valid, should load user data', () => {
      // arrange
      let profile       = testHelper.getTestProfile();
      let profileString = JSON.stringify(profile);
      localStorage.setItem("profile", profileString);

      // set a spy on the lock show method so that it won't really show'
      spyOn(service.lock, 'show');
      spyOn(service, 'isAuthenticated').and.returnValue(true);
      spyOn(service, 'loadUserData');

      // act
      service.login();

      // assert
      expect(service.loadUserData).toHaveBeenCalled();
    });

    it('when user is not authenticated and profile is valid, should not load user data', () => {
      // arrange
      let profile       = testHelper.getTestProfile();
      let profileString = JSON.stringify(profile);
      localStorage.setItem("profile", profileString);
      // set a spy on the lock show method so that it won't really show'
      spyOn(service.lock, 'show');
      spyOn(service, 'isAuthenticated').and.returnValue(false);
      spyOn(service, 'loadUserData');

      // act
      service.login();

      // assert
      expect(service.loadUserData).not.toHaveBeenCalled();
    });

    it('when user is authenticated and profile is not valid, should not load user data', () => {
      // arrange
      // set a spy on the lock show method so that it won't really show'
      spyOn(service.lock, 'show');
      spyOn(service, 'isAuthenticated').and.returnValue(false);
      spyOn(service, 'loadUserData');

      // act
      service.login();

      // assert
      expect(service.loadUserData).not.toHaveBeenCalled();
    });

  });

  });
